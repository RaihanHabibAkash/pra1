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
        const userId = req.auth?.userId;
        // Gives the all fields of the liked song
        const currentUserLikes = await User.findOne({ clerkId: userId }).populate("likedSongs");
        if(!currentUserLikes){
            console.log("You are not LogedIn", error);
            return res.status(400).json({ message: "Unauthorized" });
        }
        let songs;

        if(currentUserLikes.likedSongs.length > 0){
            const likedSongIds = currentUserLikes.likedSongs.map(song => song._id);
            // User liked songs genre playlist
            const likedGenres = [...new Set(currentUserLikes.likedSongs.map(song => song.genre))];
            const likedArtist = [...new Set(currentUserLikes.likedSongs.map(song => song.artist))];
            const likedLanguage = [...new Set(currentUserLikes.likedSongs.map(song => song.language))];

            songs = await Song.aggregate([
                {
                    $match: {
                        $or: [
                            // For genre or artist of only liked genre or liked artist song
                            { genre: { $in: likedGenres } },
                            { artist: { $in: likedArtist } },
                            { language: { $in: likedLanguage } }
                        ],
                        // Chose exept liked songs 
                        _id: { $nin: likedSongIds }
                    }
                },
                {
                    $limit: 10
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

            // If there is no liked songs will fetch random songs
            if(songs.length === 0){
                songs = await Song.aggregate([
                    {
                        $sample: {
                            size: 4
                        }
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
            }

        }
        if(songs.length == 0){
            return res.status(404).json({ message: "Songs not found" });
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
                $limit: 10
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

export const getLikedSongs = async (req, res) => {
    try {
        const userId = req.auth?.userId;
        const currentUser = await User.findOne({ clerkId: userId });
        if(!userId || !currentUser){
            return res.status(400).json({ message: "Error in getLiked Somgs" });
        }

        const songs = await Song.find({ likedBy: userId })
        .populate("likedBy").sort({ createdAt: -1 });
        if(songs.length === 0){
            return res.status(404).json({ message: "No Songs found" });
        }

        res.status(200).json({ likedSongs: songs });
    } catch (error) {
        console.error("Error in getMadeForYouSongs:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export const getRecentlyPlayedSongs = async (req, res) => {
  try {
    const userId = req.auth?.userId;
    if (!userId) {
      return res.status(400).json({ message: "User not authenticated" });
    }

    const currentUser = await User.findOne({ userId }).populate("recentlyPlayed");

    if (!currentUser) {
      return res.status(404).json({ message: "User not found" });
    }

    if(currentUser.recentlyPlayed.length > 20){
    currentUser.recentlyPlayed.slice(0, 20);
    await currentUser.save();
    }
    res.status(200).json({ recentlyPlayedSongs: currentUser.recentlyPlayed });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};