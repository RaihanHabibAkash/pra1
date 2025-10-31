import { Song } from "../models/song.model.js";
import { User } from "../models/user.model.js";

export const getAllUsers = async (req, res) => {
    try {
        const currentUser = req.auth?.userId;
        const users = await User.find({ clerkId: {$ne: currentUser} });
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

        await User.findByIdAndDelete(userId);
        res.status(200).json({ message: "User delated sucessfully" });
    } catch (error) {
        console.log("Error in deleteUser", error);
        res.status(500).json({ message: "Internal server error"})
    }
}

export const toggleLike = async (req, res) => {
    try {
        const userId = req.auth?.userId;
        const { songId } = req.params;
        if(!userId || !songId){
            return res.status(400).json({ message: "Did not found song or user"});
        }

        const currentUser = await User.findOne({ clerkId: userId });
        const song = await Song.findById(songId);
        if(!currentUser || !song){
            return res.status(404).json({ message: "Did not found song or user"});          
        }

        const alreadyLiked = currentUser.likedSongs.includes(song._id);
        if(alreadyLiked){
            // Disliking
            currentUser.likedSongs.pull(song._id);
            song.likes = Math.max((song.likes || 0) - 1, 0);
        } else{
            // Liking
            currentUser.likedSongs.push(song._id);
            song.likes = (song.likes || 0) + 1;
        }

        await Promise.all([
            song.save(),
            currentUser.save()
        ]);

        res.status(200).json({
            likes: song.likes,
            liked: !alreadyLiked
        });
    } catch (error) {
        console.error("Error in toggleLike", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export const getRecentlyPlayedSongs = async (req, res) => {
    try {
        
    } catch (error) {
        
    }
}

export const addToRecentlyPlayed = async (req, res) => {
    try {
        
    } catch (error) {
        
    }
}