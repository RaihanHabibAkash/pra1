import mongoose from "mongoose";
import { Song } from "../models/song.model.js";
import { Album } from "../models/album.model.js";
import dotenv from "dotenv";

dotenv.config();

const seedAlbums = async () => {
	try {
		await mongoose.connect(process.env.MONGODB_URI);

		await Album.deleteMany({});

		const createdSongs = await Song.insertMany([
			{
				title: "Stay With Me2",
				artist: "Sarah Mitchell2",
				imageUrl: "https://res.cloudinary.com/dqig9whl7/image/upload/v1745486748/wojs3vylznduczbgv7ye.jpg",
				imagePublicId: "wojs3vylznduczbgv7ye",
				audioUrl: "https://res.cloudinary.com/dqig9whl7/video/upload/v1745486747/oxaqb0lqfz745bjhe7h4.mp3",
				audioPublicId: "oxaqb0lqfz745bjhe7h4",
				duration: 279,
				genre: "Pop",
				language: "English"
			},
			{
				title: "Midnight Drive2",
				artist: "The Wanderers2",
				imageUrl: "https://res.cloudinary.com/dqig9whl7/image/upload/v1745486676/zwutxuxclpuy8g09r33g.jpg",
				imagePublicId: "zwutxuxclpuy8g09r33g",
				audioUrl: "https://res.cloudinary.com/dqig9whl7/video/upload/v1745486675/yiww3rn7qt2zocqzgcyd.mp3",
				audioPublicId: "yiww3rn7qt2zocqzgcyd",
				duration: 298,
				genre: "Rock",
				language: "Hindi"
			}
		]);

		const createdAlbums = await Album.insertMany([
			{
				title: "Urban Nights",
				artist: "Various Artists",
				imageUrl: "https://res.cloudinary.com/dqig9whl7/image/upload/v1745486748/wojs3vylznduczbgv7ye.jpg",
				imagePublicId: "wojs3vylznduczbgv7ye",
				releaseYear: 2025,
				songs: createdSongs.map(song => song._id)
			},
			{
				title: "Coastal Dreaming",
				artist: "Various Artists",
				imageUrl: "https://res.cloudinary.com/dqig9whl7/image/upload/v1745486676/zwutxuxclpuy8g09r33g.jpg",
				imagePublicId: "zwutxuxclpuy8g09r33g",
				releaseYear: 2025,
				songs: createdSongs.map((song) => song._id)
			}
		]);

		for(let i = 0; i < createdAlbums.length; i++) {
			const album = createdAlbums[i];
			const albumsSongs = createdAlbums[i].songs;
			
			await Song.updateMany(
				{
					_id: { $in: albumsSongs }
				},
				{
					albumId: album._id
				}
			)
		}

		console.log("Albums seeded successfully");
	} catch (error) {
		console.error("Error seeding albums", error);
	} finally {
		mongoose.connection.close();
	}
};

seedAlbums();