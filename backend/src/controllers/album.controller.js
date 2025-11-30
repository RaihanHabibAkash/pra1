import { deleteInCloudinary, uploadToCloudinary } from "../middlewere/uploadToCloudinary.js";
import { Album } from "../models/album.model.js";
import { Song } from "../models/song.model.js";
import { User } from "../models/user.model.js";

export const getAlbums = async (req, res) => {
    try {
        // const { userId } = req.auth();
        const userId = "user_368zGvjtbDr0b2tHDofDhTdNzOL"; // For Postman
        const user = await User.findOne({ clerkId: userId }).populate("albums");
        if(!user) {
            return res.status(400).json({ message: "User not found in getAlbums" })
        }
        res.status(200).json({ albums: user.albums });
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
// Done
export const createAlbum = async (req, res) => {
    try {
        const { title, releaseYear } = req.body;
        if(!title || !releaseYear){
            return res.status(400).json({ message: "Title, Release-year are required" });
        }

        // const { userId } = req.auth();
        const userId = "user_368zGvjtbDr0b2tHDofDhTdNzOL"; // For Postman
        const owner = await User.findOne({ clerkId: userId });

        if(!owner) {
            return res.status(400).json({ message: "User not found in create Album" })
        }


        if(!req.files || !req.files.imageFile){
            return res.status(400).json({ message: "Submit Image file"})
        }
        const imageFile = req.files.imageFile;

        const imageRef = await uploadToCloudinary(imageFile, "image");
        if(!imageRef){
            return res.status(400).json({ message: "Error in create Album up" });
        }

        const album = await Album.create({
            title,
            owner,
            imageUrl: imageRef.url,
            imagePublicId: imageRef.publicId,
            releaseYear
        });

        owner.albums.push(album._id);
        await owner.save();
        res.status(201).json({ 
            message: "Album Created successfully", 
            createdAlbum: album 
        });
    } catch (error) {
        console.log("Error while Creating Album", error);
        res.status(500).json({ message: "Internal Server Error", error });
    }
}

export const deleteAlbum = async (req, res) => {
    try {
        const { userId } = req.auth();
        const user = await User.findOne({ clerkId: userId });
        if(!user) {
            return res.status(400).json({ message: "User not found in deleteAlbums" })
        }

        const { id } = req.params;
        const album = await Album.findById(id);
        if(!album){
            return res.status(404).json({ message: "Album not found" });
        }

        // Delete Album Image in Cloudinary
        if(album.imagePublicId){
            try {
                await deleteInCloudinary(album.imagePublicId, "image");
            } catch (error) {
                console.log("Failed to delete album image in Cloudinary", error);
            }    
        }

        user.albums.pull(album._id);
        await user.save();

        await Album.findByIdAndDelete(id); 
        res.status(200).json({ 
            message: "Album Delted sucessfully", 
            deletedAlbum: album 
        });
    } catch (error) {
        console.log("Error while Deleting Album", error);
        res.status(500).json({ message: "Internal Server Error", error });
    }
}

export const addToAlbum = async (req, res) => {
    try {
        const { userId } = req.auth();
        const user = await User.findOne({ clerkId: userId });
        if(!user) {
            return res.status(400).json({ message: "User not found in addToAlbum" })
        }

        const { songId, albumId } = req.params;
        if(!songId || !albumId){
            return res.status(400).json({ message: "Params not found in addToAlbum"})
        }
        
        const song = await Song.findById(songId);
        if(!song){
            return res.status(404).json({ message: "Song not found in addToAlbum" });
        }

        let album = await Album.findById(albumId);
        if(!album){
           return res.status(404).json({ message: "Album not found" });
        }

        // Adding Songs to album
        if(!album.songs.some(s => s.equals(song._id))){
            album.songs.push(song._id);
            await album.save();
        }

        if(!user.albums.some(a => a.equals(album._id))){
            user.albums.push(album._id);
            await user.save();
        }

        res.status(200).json({ message: `Add to ${album.title}  Album` });
    } catch (error) {
        console.log("Error with addToAlbum", error);
        res.status(500).json({ message: "Internal Server Error", error });
    }
}

export const removeFromAlbum = async (req, res) => {
    try {
        const { userId } = req.auth();
        const user = await User.findOne({ clerkId: userId });
        if(!user) {
            return res.status(400).json({ message: "User not found in removeFromAlbum" })
        }

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
        
        if(album.songs.some(s => s.equals(song._id))){
            album.songs.pull(song._id);
            await album.save();
        }

        if(user.albums.some(a => a.equals(album._id))){
            user.albums.pull(album._id);
            await user.save();
        }

        res.status(200).json({ message: `${song.title} deleted sucesssfully from ${album.title}` });
    } catch (error) {
        console.log("Error with removeFromAlbum", error);
        res.status(500).json({ message: "Internal Server Error", error });
    }
}
