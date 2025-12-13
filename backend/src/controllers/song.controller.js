import { Song } from "../models/song.model.js";
import { User } from "../models/user.model.js";

// Done
export const getFeaturedSongs = async (req, res) => {
    try {
        const forSongs = await Song.aggregate([
            {
                // Pick 10 random songs.
                $sample: {size: 10}
            },
            {
                // Tells MongoDB which fields to include in the output
                $project: {
                    _id: 1,
                    title: 1,
                    artist: 1,
                    imageUrl: 1,
                    audioUrl: 1
                }
            }
        ]);
        if(forSongs.length == 0){
            return res.status(404).json({ message: "Songs Not Found" });
        }
        // Making Songs array 2x. because it's not enought.
        const songs = [ ...forSongs, ...forSongs ];
        res.status(200).json({ songs });
    } catch (error) {
        console.log("Error in getAllSongs", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}
// Done
export const getMadeForYouSongs = async (req, res) => {
    try {
        let songs = [];

        const { userId } = req.auth();
        const userClerk = await User.findOne({ clerkId: userId });
        
        if (!userClerk) {
            return res.status(404).json({ message: "User not found" });
        }
        const user = userClerk._id;
        if(!user){
            return res.status(400).json({ message: "Unauthorized" });
        }
        const likedSongs = await Song.find({ likedBy: user });

        if(likedSongs > 0){
            const likedSongIds = likedSongs.map(song => song._id);
            // User liked songs playlist
            const likedGenres = [...new Set(likedSongs.map(song => song.genre))];
            const likedArtist = [...new Set(likedSongs.map(song => song.artist))];
            const likedLanguage = [...new Set(likedSongs.map(song => song.language))];

            songs = await Song.find({
                        $or: [
                            // For genre or artist of only liked genre or liked artist song
                            { genre: { $in: likedGenres } },
                            { artist: { $in: likedArtist } },
                            { language: { $in: likedLanguage } }
                        ],
                        _id: { $nin: likedSongIds }
            }).sort({ createdAt: -1 }).limit(20);
        }

        if(songs.length < 20){
            // Matched played songs
            const viewedSongs = await Song.find({ playedBy: user });
            if(viewedSongs.length > 0){
                const playedSongsIds = viewedSongs.map(song => song._id);
                // User played songs playlist
                const playedGenre = [...new Set(viewedSongs.map(song => song.genre))];
                const playedArtist = [...new Set(viewedSongs.map(song => song.artist))];
                const playedLanguage = [...new Set(viewedSongs.map(song => song.language))];
        
                let moreSongs = await Song.find({
                            $or: [
                                { genre: { $in: playedGenre } },
                                { artist: { $in: playedArtist } },
                                { language: { $in: playedLanguage } }
                            ], 
                            _id: { $nin: playedSongsIds }
                }).sort({ createdAt: -1 }).limit(20);
                
                // Adding Songs with more songs.
                songs = [...songs, ...moreSongs];
                // Same name songs will be removed.
                songs = songs.filter((song, index, arr) => {
                    index === arr.findIndex(s => s._id.toString() === song._id.toString())
                });
            }
        }

        // If there is no liked songs will fetch random songs
        if(songs.length < 20){
            let randomSongs = await Song.find({
                _id: { $nin: songs.map(song => song._id) }            
            }).sort({ createdAt: -1 }).limit(20);

        songs = [...songs, ...randomSongs];
        }

        // If there is no songs
        if(songs.length === 0){
            return res.status(404).json({ message: "Songs not found" });
        }
        
        if(songs.length > 20) {
            songs = songs.slice(0 , 20);
        }
        res.status(200).json({ songs });
    } catch (error) {
        console.error("Error in getMadeForYouSongs", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}
// Done
export const getTrendingSongs = async (req, res) => {
    try {
        const songs = await Song.aggregate([
            {
                $sort: {
                    likes: -1,
                    playCount: -1
                }
            },
            {
                $limit: 20
            },
            {
                $project: {
                    _id: 1,
                    title: 1,
                    artist: 1,
                    imageUrl: 1,
                    audioUrl: 1
                }
            }
        ]);

        if(songs.length == 0) {
            return res.status(404).json({ message: "Songs Not Found" });
        }
        res.status(200).json({ songs });
    } catch (error) {
        console.error("Error in getTrendingSongs:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}
// Done
export const matchedGenre = async (req, res) => {
    try {
        let songs = [];
        
        const { userId } = req.auth();
        const userClerk = await User.findOne({ clerkId: userId });
        if(!userClerk) {
            return res.status(404).json({ message: "User not found in matchedGenre" })
        }
        const user = userClerk._id;
        if(!user){
            return res.status(400).json({ message: "User not found in matchedGenre" });
        }

        const likedSongs = await Song.find({ likedBy: user });

        // Matched liked genre songs       
        if(likedSongs.length > 0){
            const likedSongIds = likedSongs.map(song => song._id);
            const likedGenre = [...new Set(likedSongs.map(song => song.genre))]; 
            songs = await Song.find({
                genre: { $in: likedGenre },
                _id: { $nin: likedSongIds }
            }).sort({ createdAt: -1 }).limit(20);
        }

        // Matched played genre songs
        if(songs.length < 20){
            const viewedSongs = await Song.find({ playedBy: user });
            if(viewedSongs.length > 0){
                const playedSongsIds = viewedSongs.map(song => song._id);
                const playedGenre = [...new Set(viewedSongs.map(song => song.genre))];
                let moreSongs = await Song.find({
                        genre: { $in: playedGenre },
                        _id: { $nin: playedSongsIds }            
                }).sort({ createdAt: -1 }).limit(20);

                songs = [...songs, ...moreSongs];
            }
            
            // Filtering dublicate songs
            songs = songs.filter((song, index, arr) =>
                index === arr.findIndex(s => s._id.toString() === song._id.toString()));

        }
        

        // If no liked songs will fetch random
        if(songs.length < 20){
            let randomSongs = await Song.find({
                _id: { $nin: songs.map(song => song._id) }
            }).sort({ createdAt: -1 }).limit(20);

            songs = [...songs, ...randomSongs];
        }

        // If no songs
        if(songs.length === 0){
            return res.status(404).json({ message: "Songs not found on matchedGenre" });
        }

        songs = songs.slice(0, 20);
        res.status(200).json({ songs });
    } catch (error) {
        console.error("Error in matchedGenre", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}
// Done
export const matchedLanguage = async (req, res) => {
    try {
        let songs = [];

        const { userId } = req.auth();
        if(!userId) {
            return res.status(401).json({ message: "Error while req.auth in mathchedLanguage" })
        }
        const userClerk = await User.findOne({ clerkId: userId });
        if(!userClerk) {
            return res.status(404).json({ message: "User not found in matchedLanguage" })
        }
        const user = userClerk._id;
        if(!user){
            return res.status(400).json({ message: "User not found in matchedLanguage" });
        }

        const likedSongs = await Song.find({ likedBy: user });

        // Matched liked language songs
        if(likedSongs.length > 0){
            const likedSongIds = likedSongs.map(song => song._id);
            const likedLanguage = [...new Set(likedSongs.map(song => song.language))];        
            songs = await Song.find({
                language: { $in: likedLanguage },
                _id: { $nin: likedSongIds }        
            }).sort({ createdAt: -1 }).limit(20);
        }

        // Matched played language songs
        if(songs.length < 20){
            const viewedSongs = await Song.find({ playedBy: user });

            if(viewedSongs.length > 0){
                const playedSongsIds = viewedSongs.map(song => song._id);
                const playedLanguage = [...new Set(viewedSongs.map(song => song.language))];
                let moreSongs = await Song.find({
                    language: { $in: playedLanguage },
                    _id: { $nin: playedSongsIds }
                }).sort({ createdAt: -1 }).limit(20);

                songs = [...songs, ...moreSongs];
            }
            // Filtering songs
            songs = songs.filter((song, index, arr) => 
                index === arr.findIndex(s => s._id.toString() === song._id.toString()));

        }

        // If no liked songs will fetch random song
        if(songs.length < 20){
            let randomSongs = await Song.find({
                _id: { $nin: songs.map(song => song._id) }
            }).sort({ createdAt: -1 }).limit(20);

            songs = [...songs, ...randomSongs];
        }

        // If no songs
        if(songs.length === 0){
            return res.status(404).json({ message: "Songs not found on matchedLanguage" });
        }

        songs = songs.slice(0, 20);
        res.status(200).json({ songs });
    } catch (error) {
        console.error("Error in matchedLanguage", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}
// Done
export const getLikedSongs = async (req, res) => {
    try {
        const { userId } = req.auth();
        if(!userId){
            return res.status(400).json({ message: "Error in getLiked Somgs while params" });
        }
        const userClerk = await User.findOne({ clerkId: userId });
        if(!userClerk){
            return res.status(400).json({ message: "Error in getLiked Somgs while usrClerk" });
        }
        const user = userClerk._id;

        const songs = await Song.find({ likedBy: user }).sort({ createdAt: -1 });

        const forSongs = songs || null;
        res.status(200).json({ forSongs });
    } catch (error) {
        console.error("Error in getMadeForYouSongs:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}
// Done
export const getRecentlyPlayedSongs = async (req, res) => {
  try {
    // const { userId } = req.auth();
    const userId = "user_368zGvjtbDr0b2tHDofDhTdNzOL";
    if (!userId) {
      return res.status(400).json({ message: "User not authenticated" });
    }

    const userClerk = await User.findOne({ clerkId: userId });
    if (!userClerk) {
      return res.status(404).json({ message: "User not found in getRecentlyPlayed" });
    }

    const user = userClerk._id;

    const playedSongs = await Song.find({ playedBy: user });

    let songs = playedSongs.filter((song, index, arr) => {
        return index === arr.findIndex(
            s => s._id.toString() === song._id.toString()
        );
    });

    if(songs.length > 20){
       songs = songs.slice(0, 20);
    }

    const forSongs = songs || null;
    res.status(200).json({ forSongs });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};