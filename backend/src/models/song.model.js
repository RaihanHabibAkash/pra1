import mongoose from "mongoose";

const songSchema = new mongoose.Schema({
    title: {
        type: String, 
        required: true
    },
    artist: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    },
    imagePublicId: {
        type: String,
        required: true
    },
    audioUrl: {
        type: String,
        required: true
    },
    audioPublicId: {
        type: String,
        required: true
    },
    duration: {
        type: Number,
        required: true
    },
    likedBy: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        default: [],
        required: false
    }],
    genre: {
        type: String,
        enum: [
            "Pop",
            "Rock",
            "Hip Hop",
            "R&B",
            "Electronic",
            "Jazz",
            "Country",
            "Classical",
            "Reggae",
            "Indie"
        ],
        required: true
    },
    language: {
        type: String,
        enum: [
            "English", 
            "Bangla", 
            "Urdu",
            "Arbi", 
            "Hindi", 
            "Spenish", 
            "French", 
            "Music", 
            "Others"
        ],
        required: true
    },
    albumId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Album",
        required: false
    },
    likes: {
        type: Number,
        default: 0,
        required: false
    },
    playedBy: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }],
}, {timestamps: true});

export const Song = mongoose.model("Song", songSchema);