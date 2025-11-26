import mongoose from "mongoose";
import { Song } from "../models/song.model.js";
import dotenv from "dotenv";

dotenv.config();

const songs = [
    {
		title: "Stay With Me",
		artist: "Sarah Mitchell",
		imageUrl: "https://res.cloudinary.com/dqig9whl7/image/upload/v1745486748/wojs3vylznduczbgv7ye.jpg",
		imagePublicId: "wojs3vylznduczbgv7ye",
		audioUrl: "https://res.cloudinary.com/dqig9whl7/video/upload/v1745486747/oxaqb0lqfz745bjhe7h4.mp3",
		audioPublicId: "oxaqb0lqfz745bjhe7h4",
		duration: 279,
		genre: "Pop",
		language: "English"
	},
	{
		title: "Midnight Drive",
		artist: "The Wanderers",
		imageUrl: "https://res.cloudinary.com/dqig9whl7/image/upload/v1745486676/zwutxuxclpuy8g09r33g.jpg",
		imagePublicId: "zwutxuxclpuy8g09r33g",
		audioUrl: "https://res.cloudinary.com/dqig9whl7/video/upload/v1745486675/yiww3rn7qt2zocqzgcyd.mp3",
		audioPublicId: "yiww3rn7qt2zocqzgcyd",
		duration: 298,
		genre: "Rock",
		language: "Hindi"
	}
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