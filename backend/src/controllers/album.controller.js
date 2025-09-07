import { Album } from "../models/album.model.js"

export const getAlbums = async (req, res) => {
    try {
        const albums = await Album.find();
        if(!albums){
            return res.status(404).json({ message: "Albums not found" });
        }
        res.status(200).json({ albums });
    } catch (error) {
        console.log("Error in getAlbums", error);
        res.status(400).json({ message: "Internal Server Error" });
    }
}

export const getAlbumById = async (req, res) => {
    try {
        const { albumId } = req.params;

        const album = await Album.findById(albumId).populate("songs");
        if(!album){
            return res.status(404).json({ message: "AlbumId not found" });
        }

        res.status(200).json({ album });
    } catch (error) {
        console.log("Error in getAlbumById", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}