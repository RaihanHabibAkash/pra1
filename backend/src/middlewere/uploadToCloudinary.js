import cloudinary from "../lib/cloudinary.js";
import { User } from "../models/user.model.js";

export const uploadToCloudinary = async (file, fileType) => {
    try {
        let forResourceType = "";
        let forFolder = "";

        const userId = req.auth;
        const user = await User.findById(userId);
        if(!user) {
           return console.log("User not found in uploadToCloudinary");
        }

        // Check File types
        if(fileType === "image") {
            forResourceType = "image";
            forFolder = `Pra1/Img/${(user.fullName).trim()}`;

        } else if(fileType === "audio") {
            forResourceType = "video";
            forFolder = `Pra1/Audio/${(user.fullName).trim()}`;

        } else {
            throw new Error("Invalied file type");
        }

        // Uploading depending on the file type
        const result = await cloudinary.uploader.upload(file.tempFilePath, {
            resource_type: forResourceType,
            folder: forFolder 
        }); 

        return { 
                url: result.secure_url,
                publicId: result.public_id,
               }
    } catch (error) {
        console.log("Error while uploading in Cloudinary", error);
        throw new Error(`Error while uploading in Cloudinary: ${error.message}`);
    }
}

export const deleteInCloudinary = async (public_id, fileType) => { 
    try {
        let forResourceType = "";

        if(fileType === "image") {
            forResourceType = "image";

        } else if(fileType === "audio") {
            forResourceType = "video";

        } else {
            throw new Error("Invalied file type");
        }

        const result = await cloudinary.uploader.destroy(public_id, { 
            resource_type: forResourceType 
        });

        if(result.result !== "ok") {
            throw new Error(`count not delete the ${public_id} file: ${result.result}`);
        }
    } catch (error) {
        console.log("Error while delteing in Cloudinary", error);
        throw new Error(`Error while deleteing in Cloudinary: ${error.message}`);
    }
}