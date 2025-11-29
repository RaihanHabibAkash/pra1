import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    clerkId: {
        type: String,
        required: true,
        unique: true
    },
    likedSongs: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Song",
        default: [],
        required: true
    }],
    recentlyPlayed: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Song",
        default: [],
        required: true
    }],
    albums: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Album",
        default: [],
        required: true
    }]
}, { timestamps: true });

export const User = mongoose.model("User", userSchema);