import { Song } from "../models/song.model.js";
import { User } from "../models/user.model.js";

export const getAllSongs = async (req, res) => {
    try {
        // Newest to Oldest
        const songs = await Song.find().sort({ createdAt: -1 });
        if(songs.length == 0){
            return res.status(400).json({ message: "Songs Not Found" });
        }
        res.status(200).json({ songs });
    } catch (error) {
        console.log("Error in getAllSongs", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

export const getFeaturedSongs = async (req, res) => {
    try {
        const songs = await Song.aggregate([
            {
                // Pick 6 random songs
                $sample: {size: 6}
            },
            {
                // Tells MongoDB which fields to include in the output
                $project: {
                    _id: 1,
                    title: 1,
                    artist: 1,
                    genre: 1,
                    imageUrl: 1,
                    audioUrl: 1
                }
            }
        ]);
        if(songs.length == 0){
            return res.status(404).json({ message: "Songs Not Found" });
        }
        res.status(200).json({songs});
    } catch (error) {
        console.log("Error in getAllSongs", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export const getMadeForYouSongs = async (req, res) => {
    try {
    const { id } = req.params;
    const userId = Song.findById(id); 

    let songs;

    if (userId) {
      const user = await User.findById(userId).populate("likedSongs");

      if (user && user.likedSongs.length > 0) {
        // find all unique genres from liked songs
        const likedGenres = [...new Set(user.likedSongs.map(song => song.genre))];

        // find other songs with same genres (but not already liked)
        songs = await Song.find({
          genre: { $in: likedGenres },
          _id: { $nin: user.likedSongs.map(song => song._id) }
        })
          .sort({ createdAt: -1 })
          .limit(4)
          .select("_id title artist imageUrl audioUrl");
      }
    }

    // if user not logged in or no liked songs → fallback to random
    if (!songs || songs.length === 0) {
      songs = await Song.aggregate([
        { $sample: { size: 4 } },
        {
          $project: {
            _id: 1,
            title: 1,
            artist: 1,
            imageUrl: 1,
            audioUrl: 1
          }
        }
      ]);
    }

    if (songs.length == 0) {
      return res.status(404).json({ message: "Songs Not Found" });
    }

    res.status(200).json({ songs });
  } catch (error) {
    console.error("Error in getMadeForYouSongs:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export const getTrendingSongs = async (req, res) => {
    try {
        const songs = await Song.aggregate([
            {
                $sort: {
                    likes: -1,
                    playCount: -1
                }
            },
            {
                $limit: 4
            },
            {
                $project: {
                    _id: 1,
                    title: 1,
                    artist: 1,
                    imageUrl: 1,
                    audioUrl: 1
                }
            }
        ]);

        if(songs.length == 0) {
            return res.status(404).json({ message: "Songs Not Found" });
        }
        res.status(200).json({ songs });
    } catch (error) {
        console.error("Error in getTrendingSongs:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}