import mongoose from "mongoose";
import { Song } from "../models/song.model.js";
import dotenv from "dotenv";

dotenv.config();

const songs = [
    {
		title: "Stay With Me",
		artist: "Sarah Mitchell",
		imageUrl: "/cover-images/1.jpg",
		audioUrl: "/songs/1.mp3",
		duration: 46, 
	},
	{
		title: "Midnight Drive",
		artist: "The Wanderers",
		imageUrl: "/cover-images/2.jpg",
		audioUrl: "/songs/2.mp3",
		duration: 41,
	},
	{
		title: "Lost in Tokyo",
		artist: "Electric Dreams",
		imageUrl: "/cover-images/3.jpg",
		audioUrl: "/songs/3.mp3",
		duration: 24,
	},
];

const seedSongs = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);

        await Song.deleteMany({});

        await Song.insertMany(songs);

        console.log("Songs have been seeded successfully");
    } catch (error) {
        console.log("Error while seeding songs:", error);
    } finally {
        mongoose.connection.close();
    }
}

seedSongs();