import { deleteInCloudinary, uploadToCloudinary } from "../middlewere/uploadToCloudinary.js";
import { Album } from "../models/album.model.js";
import { Song } from "../models/song.model.js";

export const getAlbums = async (req, res) => {
    try {
        const albums = await Album.find();
        if(!albums){
            return res.status(404).json({ message: "Albums not found" });
        }
        res.status(200).json({ albums });
    } catch (error) {
        console.log("Error in getAlbums", error);
        res.status(500).json({ message: "Internal Server Error" });
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
export const createAlbum = async (req, res) => {
    try {
        const { title, artist, releaseYear } = req.body;
        if(!title || !artist || !releaseYear){
            return res.status(400).json({ message: "Title, Artist, Release-year are required" });
        }

        if(!req.files || !req.files.imageFile){
            return res.status(400).json({ message: "Submit Image file"})
        }
        const imageFile = req.files.imageFile;

        const imageRef = await uploadToCloudinary(imageFile, "image");
        if(imageRef){
            return res.status(400).json({ message: "Error in create Album up" });
        }

        const album = new Album({
            title,
            artist,
            imageUrl: imageRef.url,
            imagePublicId: imageRef.publicId,
            releaseYear
        });
        await album.save();
        res.status(201).json({ message: "Album Created successfully", createdAlbum: album });
    } catch (error) {
        console.log("Error while Creating Album", error);
        res.status(500).json({ message: "Internal Server Error", error });
    }
}

export const deleteAlbum = async (req, res) => {
    try {
        const { id } = req.params;

        // Finding Album in MongoDB
        const album = await Album.findById(id);
        if(!album){
            return res.status(404).json({ message: "Album not found" });
        }

        // Delete Album Image in Cloudinary
        if(album.imagePublicId){
            await deleteInCloudinary(album.imagePublicId, "image");
        }
        // Delte Album in MongoDB
        await Album.findByIdAndDelete(id);
        res.status(200).json({ message: "Album Delted sucessfully", deletedAlbum: album });
    } catch (error) {
        console.log("Error while Deleting Album", error);
        res.status(500).json({ message: "Internal Server Error", error });
    }
}

export const addToAlbum = async (req, res) => {
    try {
        const { songId, albumId } = req.params;
        if(!songId || !albumId){
            return res.status(400).json({ message: "Params not found in addToAlbum"})
        }
        
        const song = await Song.findById(songId);
        if(!song){
            return res.status(404).json({ message: "Song not found in addToAlbum" });
        }

        let album = await Album.findById(albumId);

        // Create album
        if(!album){
           return res.status(404).json({ message: "Album not found" });
        }

        // Adding Songs to album
        if(!album.songs.some(s => s.equals(song._id))){
            album.songs.push(song._id);
            await album.save();
        }

        if(!song.albumId.some(s => s.equals(album._id))){
            song.albumId.push(album._id);
            await song.save();
        }

        res.status(200).json({ message: `Add to ${album.title}  Album` });
    } catch (error) {
        console.log("Error with addToAlbum", error);
        res.status(500).json({ message: "Internal Server Error", error });
    }
}

export const removeFromAlbum = async (req, res) => {
    try {
        const { albumId, songId } = req.params;
        if(!songId || !albumId){
            return res.status(400).json({ message: "Params not found in removeFromAlbum" });
        }

        const song = await Song.findById(songId);
        if(!song){
            return res.status(404).json({ message: "Song not found in removeFromAlbum" });
        }

        const album = await Album.findById(albumId);
        if(!album){
            return res.status(404).json({ message: "Album not found in removeAlbum" });
        }
        
        // Deleting song from album
        if(album.songs.some(s => s.equals(song._id))){
            album.songs.pull(song._id);
            await album.save();
        }

        // Deleting albumId from song
        if(song.albumId.some(a => a.equals(song._id))){
            song.albumId.pull(album._id);
            await song.save();
        }

        res.status(200).json({ message: `${song.title} deleted sucesssfully from ${album.title}` });
    } catch (error) {
        console.log("Error with removeFromAlbum", error);
        res.status(500).json({ message: "Internal Server Error", error });
    }
}
