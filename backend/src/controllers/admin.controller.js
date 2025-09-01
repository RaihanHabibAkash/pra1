import cloudinary from "../lib/cloudinary.js";
import { Song } from "../models/song.model.js";
import { Album } from "../models/album.model.js";

const uploadToCloudinary = async (file) => {
    try {
        const result = await cloudinary.uploader.upload(file.tempFilePath, {
            resource_type: "auto"
        }); 

        return result.secure_url;
    } catch (error) {
        console.log("Error while uploading in Cloudinary", error);
        throw new Error(`Error while uploading in Cloudinary: ${error.message}`);
    }
}
export const createSong = async (req, res) => {
    try {
        const { title, artist, duration, albumId } = req.body;
        if(!title || !artist || !duration){
            return res.status(400).json({message: "title, artist and duration are required"});
        }

        if(!req.files || !req.files.audiofile || !req.files.imagefile){
            return res.status(400).json({message: "Submit all files"});
        }
        const audioFile = req.files.audiofile;
        const imageFile = req.files.imagefile;
        const [ audioUrl, imageUrl ] = await Promise.all([
            uploadToCloudinary(audioFile),
            uploadToCloudinary(imageFile),
        ]);

        const song = new Song({
            title,
            artist,
            imageUrl,
            audioUrl,
            duration,
            albumId: albumId || null    
        })
        await song.save();

        if(albumId){
            await Album.findByIdAndUpdate(albumId, {
                $push: { songs: song._id }
            }) 
        }

        return res.status(201).json({ message: "Song Created Sucessfully", song});
    } catch (error) {
        console.log("Error while creating song", error);
        res.status(500).json({message: "Internal server error", error});
    }
};  