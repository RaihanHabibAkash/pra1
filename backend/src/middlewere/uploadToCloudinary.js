import cloudinary from "../lib/cloudinary.js";

export const uploadToCloudinary = async (file, fileType) => {
    try {
        let forResourceType = "";
        let forFolder = "";

        // Check File types
        if(fileType === "image") {
            forResourceType = "image";
            forFolder = "Pra1/Img";

        } else if(fileType === "audio") {
            forResourceType = "video";
            forFolder = "Pra1/Audio";

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
            throw new Error(`count not delete the file: ${result.result}`);
        }
    } catch (error) {
        console.log("Error while delteing in Cloudinary", error);
        throw new Error(`Error while deleteing in Cloudinary: ${error.message}`);
    }
}