import { Song } from "../models/song.model.js";
import { Album } from "../models/album.model.js";
import { deleteInCloudinary, uploadToCloudinary } from "../middlewere/uploadToCloudinary.js";
import { User } from "../models/user.model.js";

export const getAllSongs = async (req, res) => {
    try {
        // Newest to Oldest
        const songs = await Song.find().sort({ createdAt: -1 });
        if(songs.length === 0){
            return res.status(400).json({ message: "Songs Not Found" });
        }
        res.status(200).json({ songs });
    } catch (error) {
        console.log("Error in getAllSongs", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

export const createSong = async (req, res) => {
    try {
        const { title, artist, duration, genre, language , albumId } = req.body;
        if(!title || !artist || !duration || !genre || !language){
            return res.status(400).json({ message: "Title, Artist , Duration, genre and language are required" });
        }
        if(isNaN(duration)){
            return res.status(400).json({ message: "Duration must be a Number" }); 
        }

        if(!req.files || !req.files.audioFile || !req.files.imageFile){
            return res.status(400).json({ message: "Submit all files" });
        }
        const audioFile = req.files.audioFile;
        const imageFile = req.files.imageFile;
        const [ audioRef, imageRef ] = await Promise.all([
            uploadToCloudinary(audioFile, "audio"),
            uploadToCloudinary(imageFile, "image"),
        ]);

        const song = new Song({
            title,
            artist,
            imageUrl: imageRef.url,
            imagePublicId: imageRef.publicId,
            audioUrl: audioRef.url,
            audioPublicId: audioRef.publicId,
            duration,
            genre,
            language,
            albumId: albumId || null
        });
        await song.save();

        if(albumId){
            await Album.findByIdAndUpdate(albumId, {
                $push: { songs: song._id }
            }) 
        }

        res.status(201).json({ message: "Song Created Sucessfully", createdSong: song });
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
        if(song.audioPublicId && song.imagePublicId){
            await Promise.all([
                deleteInCloudinary(song.audioPublicId, "audio"),
                deleteInCloudinary(song.imagePublicId, "image"),
            ]);

            await Song.findByIdAndDelete(id);
            res.status(200).json({ message: "Song deleted successfully", deletedSong: song });
        }     
    } catch (error) {
        console.log("Error while deleteing a Song", error);
        res.status(500).json({ message: "Internal Server Error", error });
    }
}

export const checkAdmin = (req, res) => {
    res.status(200).json({ admin: true });
}

export const getAllUsers = async (req, res) => {
    try {
        const { userId } = req.auth();
        const currentUser = userId;
        const users = await User.find({ clerkId: { $ne: currentUser } });
        if(users.length == 0){
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({ users });
    } catch (error) {
        console.log("Error in getAllUsers", error);
        res.status(500).json({ message: "Internal server error"})
    }
}

export const deleteUser = async (req, res) => {
    try {
        const { userId } = req.params;
        if(!userId){
            return res.status(400).json({ message: "Not found" });
        }
        const user = await User.findOne({ clerkId: userId });
        if(!user){
            return res.status(400).json({ message: "Not found" });
        }
                
        await Promise.all([
            Song.updateMany({}, { $pull: { likedBy: user._id, playedBy: user._id } }),
            User.findByIdAndDelete(user._id)
        ]);
        
        res.status(200).json({ message: "User delated sucessfully" });
    } catch (error) {
        console.log("Error in deleteUser", error);
        res.status(500).json({ message: "Internal server error"})
    }
}