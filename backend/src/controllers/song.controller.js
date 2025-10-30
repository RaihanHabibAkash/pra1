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
        const currentUser = User.findById(userId).populate("likedSongs");
        if(!currentUser){
            console.log("You are not LogedIn", error)
            return res.status(400).json({ message: "Unauthorized" });
        }
        let songs;

        if(currentUser.likedSongs.length > 0){
            // User liked songs genre playlist
            const likedGenres = [...new Set(currentUser.likedSongs.map(song => song.genre))];
            // User liked songs artist playlist
            const likedArtist = [...new Set(currentUser.likedSongs.map(song => song.artist))];
            const likedSongIds = currentUser.likedSongs.map(song => song._id);

            songs = await Song.aggregate([
                {
                    $match: {
                        $or: [
                            { genre: { $in: likedGenres } },
                            { aritst: { $in: likedArtist } }
                        ],
                        // Chose exept liked songs 
                        _id: { $nin: likedSongIds }
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

            // If there is no liked songs will fetch random songs
            if(songs.length == 0){
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