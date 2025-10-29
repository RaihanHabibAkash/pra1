import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    },
    clerkId: {
        type: String,
        required: true,
        unique: true
    },
    likedSongs: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Song",
        required: false
    }],
    recentlyPlayed: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Song",
        required: false
    }]
}, {timestamps: true});

export const User = mongoose.model("User", userSchema);