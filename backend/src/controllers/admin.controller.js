import cloudinary from "../lib/cloudinary.js";
import { Song } from "../models/song.model.js";
import { Album } from "../models/album.model.js";

const uploadToCloudinary = async (file) => {
    try {
        const result = await cloudinary.uploader.upload(file.tempFilePath, {
            resource_type: "auto"
        }); 

        return { url: result.secure_url,
                 publicId: result.public_id,
               }
    } catch (error) {
        console.log("Error while uploading in Cloudinary", error);
        throw new Error(`Error while uploading in Cloudinary: ${error.message}`);
    }
}
// resource_type = "video"; can be use in both "audio" and "video" 
const deleteInCloudinary = async (public_id, resource_type = "video") => {
    try {
        await cloudinary.uploader.destroy(public_id, { resource_type });
    } catch (error) {
        console.log("Error while delteing in Cloudinary", error);
        throw new Error(`Error while deleteing in Cloudinary: ${error.message}`);
    }
}

export const createSong = async (req, res) => {
    try {
        const { title, artist, duration, albumId } = req.body;
        if(!title || !artist || !duration){
            return res.status(400).json({ message: "title, artist and duration are required" });
        }

        if(!req.files || !req.files.audiofile || !req.files.imagefile){
            return res.status(400).json({ message: "Submit all files" });
        }
        const audioFile = req.files.audiofile;
        const imageFile = req.files.imagefile;
        const [ audioRef, imageRef ] = await Promise.all([
            uploadToCloudinary(audioFile),
            uploadToCloudinary(imageFile),
        ]);

        const song = new Song({
            title,
            artist,
            imageUrl: imageRef.url,
            imagePublicId: imageRef.publicId,
            audioUrl: audioRef.url,
            audioPublicId: audioRef.publicId,
            duration,
            albumId: albumId || null    
        });
        await song.save();

        if(albumId){
            await Album.findByIdAndUpdate(albumId, {
                $push: { songs: song._id }
            }) 
        }

        return res.status(201).json({ message: "Song Created Sucessfully", createdSong: song });
    } catch (error) {
        console.log("Error while creating song", error);
        res.status(500).json({ message: "Internal server error", error });
    }
};  

export const deleteSong = async (req, res) => {
    try {
        const { id } = req.params;
        const song = await Song.findById(id);
        if(!song){
            return res.status(404).json({ message: "Song not found" });
        }
        
        if(song.albumId){
            await Album.findByIdAndUpdate(song.albumId, {
                $pull: { songs: song._id } 
            });
        }
        if(song.audioPublicId || song.imagePublicId){
            await Promise.all([
                deleteInCloudinary(song.audioPublicId, "video"),
                deleteInCloudinary(song.imagePublicId, "image"),
            ]);
        }
        await Song.findByIdAndDelete(id);

        return res.status(200).json({ message: "Song deleted successfully", deletedSong: song });
    } catch (error) {
        console.log("Error while deleteing a Song", error);
        res.status(500).json({ message: "Internal Server Error", error });
    }
}