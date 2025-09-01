import cloudinary from "../lib/cloudinary.js";
const uploadToCloudinary = async (file) => {
    try {
        const result = await cloudinary.uploader.upload(fiel)
    } catch (error) {
        
    }
}
export const createSong = async (req, res) => {
    try {
        if(!req.files || !req.files.audiofile || !req.files.imagefile){
            return res.status(400).json({message: "Submit all files"});
        }
        const { title, artist, duration, albumId } = req.body;
        const audioFile = req.files.audiofile;
        const imageFile = req.files.imagefile;
    } catch (error) {
        
    }
};  