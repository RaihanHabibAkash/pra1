import { Song } from "../models/song.model.js";
import { User } from "../models/user.model.js";

export const getFeaturedSongs = async (req, res) => {
    try {
        const songs = await Song.aggregate([
            {
                // Pick 6 random songs
                $sample: {size: 6}
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
        if(songs.length == 0){
            return res.status(404).json({ message: "Songs Not Found" });
        }
        res.status(200).json({ songs });
    } catch (error) {
        console.log("Error in getAllSongs", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export const getMadeForYouSongs = async (req, res) => {
    try {
        const userId = req.auth?.userId;
        // Gives the all fields of the liked song
        const currentUserLikes = await User.findOne({ clerkId: userId }).populate("likedSongs");
        if(!currentUserLikes){
            return res.status(400).json({ message: "Unauthorized" });
        }
        let songs = [];

        if(currentUserLikes.likedSongs.length > 0){
            const likedSongIds = currentUserLikes.likedSongs.map(song => song._id);
            // User liked songs genre playlist
            const likedGenres = [...new Set(currentUserLikes.likedSongs.map(song => song.genre))];
            const likedArtist = [...new Set(currentUserLikes.likedSongs.map(song => song.artist))];
            const likedLanguage = [...new Set(currentUserLikes.likedSongs.map(song => song.language))];

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
            const viewedSongs = await Song.find({ playedBy: currentUserLikes._id });
            if(viewedSongs.length > 0){
                const playedSongsIds = viewedSongs.map(song => song._id);
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
                
                songs = [...songs, ...moreSongs];
                songs = songs.filter((song, index, arr) => 
                    index === arr.findIndex(s => s._id.toString() === song._id.toString())
                );
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
        songs = songs.slice(0 , 20)
        res.status(200).json({ songs });
    } catch (error) {
        console.error("Error in getMadeForYouSongs", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

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
                $limit: 10
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

export const matchedGenre = async (req, res) => {
    try {
        let songs = [];
        
        const userId = req.auth?.userId;
        const user = await User.findOne({ clerkId: userId }).populate("likedSongs");
        if(!userId || !user){
            return res.status(400).json({ message: "User not found in matchedGenre" });
        }

        // Matched liked genre songs       
        if(user.likedSongs.length > 0){
            const likedSongIds = user.likedSongs.map(song => song._id);
            const likedGenre = [...new Set(user.likedSongs.map(song => song.genre))]; 
            songs = await Song.find({
                genre: { $in: likedGenre },
                _id: { $nin: likedSongIds }
            }).sort({ createdAt: -1 }).limit(20);
        }

        // Matched played genre songs
        if(songs.length < 20){
            const viewedSongs = await Song.find({ playedBy: user._id });
            if(viewedSongs.length > 0){
                const playedSongsIds = viewedSongs.map(song => song._id);
                const playedGenre = [...new Set(viewedSongs.map(song => song.genre))];
                    let moreSongs = await Song.find({
                        genre: { $in: playedGenre },
                        _id: { $nin: playedSongsIds }            
                }).sort({ createdAt: -1 }).limit(20);
            }
            songs = [...songs, ...moreSongs];
            songs = songs.filter((song, index, arr) =>
                index === arr.findIndex(s => s._id.toString() === song._id.toString()));

        }
        

        // If no liked songs will fetch 
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

export const matchedLanguage = async (req, res) => {
    try {
        let songs = [];

        const userId = req.auth?.userId;
        const user = await User.findOne({ clerkId: userId }).populate("likedSongs");
        if(!userId || !user){
            return res.status(400).json({ message: "User not found in matchedLanguage" });
        }

        // Matched liked language songs
        if(user.likedSongs.length > 0){
            const likedSongIds = user.likedSongs.map(song => song._id);
            const likedLanguage = [...new Set(user.likedSongs.map(song => song.language))];        
            songs = await Song.find({
                language: { $in: likedLanguage },
                _id: { $nin: likedSongIds }        
            }).sort({ createdAt: -1 }).limit(20);
        }

        // Matched played language songs
        if(songs.length < 20){
            const viewedSongs = await Song.find({ playedBy: user._id });

            if(viewedSongs.length > 0){
                const playedSongsIds = viewedSongs.map(song => song._id);
                const playedLanguage = [...new Set(viewedSongs.map(song => song.language))];
                let moreSongs = await Song.find({
                    language: { $in: playedLanguage },
                    _id: { $nin: playedSongsIds }
                }).sort({ createdAt: -1 }).limit(20);

                songs = [...songs, ...moreSongs];
            }
            songs = songs.filter((song, index, arr) => 
                index === arr.findIndex(s => s._id.toString() === song._id.toString()));

        }

        // If no liked songs will fetch 
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

export const getLikedSongs = async (req, res) => {
    try {
        const userId = req.auth?.userId;
        const currentUser = await User.findOne({ clerkId: userId });
        if(!userId || !currentUser){
            return res.status(400).json({ message: "Error in getLiked Somgs" });
        }

        const songs = await Song.find({ likedBy: userId })
        .populate("likedBy").sort({ createdAt: -1 });
        if(songs.length === 0){
            return res.status(404).json({ message: "No Songs found" });
        }

        res.status(200).json({ likedSongs: songs });
    } catch (error) {
        console.error("Error in getMadeForYouSongs:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export const getRecentlyPlayedSongs = async (req, res) => {
  try {
    const userId = req.auth?.userId;
    if (!userId) {
      return res.status(400).json({ message: "User not authenticated" });
    }

    const currentUser = await User.findOne({ userId }).populate("recentlyPlayed");

    if (!currentUser) {
      return res.status(404).json({ message: "User not found" });
    }

    if(currentUser.recentlyPlayed.length > 20){
    currentUser.recentlyPlayed.slice(0, 20);
    await currentUser.save();
    }
    res.status(200).json({ recentlyPlayedSongs: currentUser.recentlyPlayed });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};