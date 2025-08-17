import mongoose from "mongoose";

export const connectionDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI);
        console.log(`Connected to MongoDB ${conn.connection.host}`);
    } catch (error) {
        console.log("Failed to connect DB", error.message);
        process.exit(1); // 0 for sucess 1 for fail
    }
};