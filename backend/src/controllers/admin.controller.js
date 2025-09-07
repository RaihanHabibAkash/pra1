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
// resource_type = "video" => for default; can be use in both "audio" and "video" 
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
            return res.status(400).json({ message: "Title, Artist and Duration are required" });
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
        if(song.audioPublicId && song.imagePublicId){
            await Promise.all([
                deleteInCloudinary(song.audioPublicId, "video"),
                deleteInCloudinary(song.imagePublicId, "image"),
            ]);

            await Song.findByIdAndDelete(id);
            return res.status(200).json({ message: "Song deleted successfully", deletedSong: song });
        }     
    } catch (error) {
        console.log("Error while deleteing a Song", error);
        res.status(500).json({ message: "Internal Server Error", error });
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
        const imageRef = await uploadToCloudinary(imageFile);

        const album = new Album({
            title,
            artist,
            imageUrl: imageRef.url,
            imagePublicId: imageRef.publicId,
            releaseYear
        });

        await album.save();
        res.status(201).json({ message: "Album Created sucessfully", createdAlbum: album });
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

        // Finding Songs of the Album
        const songs = await Song.find({ albumId: id });
        // Delete Song of Album in Cloudinary
        if(songs.length > 0){
            await Promise.all(
                songs.flatMap(
                    song => [
                        song.imagePublicId && deleteInCloudinary(song.imagePublicId, "image"),
                        song.audioPublicId && deleteInCloudinary(song.audioPublicId, "video"),])
            )
        }
        // MongoDB deletation for Songs in Album
        await Song.deleteMany({ albumId: id });

        // Delete Album Image in Cloudinary
        if(album.imagePublicId){
            await deleteInCloudinary(album.imagePublicId, "image");
        }
        // Delte Album in MongoDB
        await Album.findByIdAndDelete(id);
        res.status(200).json({ message: "Album Delted sucessfully", deletedAlbum: album });
    } catch (error) {
        console.log("Error while Deleting Album", error);
        res.status(500).json({ message: "Internal Server Error", error })
    }
}

export const checkAdmin = (req, res) => {
    res.status(200).json({ admin: true });
}