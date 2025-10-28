import { Song } from "../models/song.model.js";
export const getAllSongs = async (req, res) => {
    try {
        const songs = await Song.find({ createdAt: -1 });
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
                $sample: {size: 6}
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
        if(songs.length == 0){
            return res.status(400).json({ message: "Songs Not Found" });
        }
        res.status(200).json({songs});
    } catch (error) {
        console.log("Error in getAllSongs", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export const getMadeForYouSongs = async (req, res) => {
    try {
        const songs = await Song.aggregate([
            {
                $sample: {size: 4}
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
        if(songs.length == 0){
            return res.status(400).json({ message: "Songs Not Found" });
        }
        res.status(200).json({songs});
    } catch (error) {
        console.log("Error in getAllSongs", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export const getTrendingSongs = async (req, res) => {
    try {
        const songs = await Song.aggregate([
            {
                $sample: {size: 4}
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
        if(songs.length == 0){
            return res.status(400).json({ message: "Songs Not Found" });
        }
        res.status(200).json({songs});
    } catch (error) {
        console.log("Error in getAllSongs", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}