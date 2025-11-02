import { Song } from "../models/song.model.js";
import { User } from "../models/user.model.js";
import { Album } from "../models/album.model.js";

export const getStats = async (req, res) => {
    try {
        const [ totalUsers,
                totalAlbums, 
                totalSongs, 
                uniqueArtist ] = await Promise.all([
            User.countDocuments(),
            Album.countDocuments(),
            Song.countDocuments(),
            Song.aggregate([
                {
                    $unionWith: {
                        // Connecting song with album
                        coll: "albums",
                        // "pipeline": [] means don’t filter anything 
                        // just take all album documents
                        pipeline: []
                    }
                },
                {
                    $group: {
                    // Group using artist
                        _id: "$artist"
                    }
                },
                {
                    $count: "count"
                }
            ]),
        ]);
        res.status(200).json({
            totalUsers,
            totalAlbums,
            totalSongs,
            totalArtist : uniqueArtist[0]?.count || 0
        });
    } catch (error) {
        console.log("Error in getStats", error);
        res.status(500).json({ message: "Internal server error" });
    }
}