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
        required: true,
        unique: true
    },
    imagePublicId: {
        type: String,
        required: true,
        unique: true
        // not yet
    },
    audioUrl: {
        type: String,
        required: true,
        unique: true
    },
    audioPublicId: {
        type: String,
        required: true,
        unique: true
        // not yet
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
    playedBy: [{
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
        // not yet
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
        // not yet
    },
    albumId: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Album",
        required: false
    }],
    likes: {
        type: Number,
        default: 0,
        required: false
    },
    playCount: {
        type: Number,
        default: 0,
        required: false
    }
    
}, {timestamps: true});

export const Song = mongoose.model("Song", songSchema);