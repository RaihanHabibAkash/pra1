import { Song } from "../models/song.model.js";
import { User } from "../models/user.model.js";

export const toggleLike = async (req, res) => {
    try {
        const { userId } = req.auth();
        const { id } = req.params;
        if(!userId || !id){
            return res.status(400).json({ message: "Did not found song or user"});
        }

        const currentUser = await User.findOne({ clerkId: userId });
        const song = await Song.findById(id);
        if(!currentUser || !song){
            return res.status(404).json({ message: "Did not found song or user"});          
        }

       const alreadyLiked = currentUser.likedSongs.some(s => s.equals(song._id));
        if(!alreadyLiked){
            // Liking
            song.likedBy.push(currentUser._id);
            currentUser.likedSongs.push(song._id);
            song.likes = (song.likes || 0) + 1;
        } else{
            // Disliking
            song.likedBy.pull(currentUser._id);
            currentUser.likedSongs.pull(song._id);
            song.likes = Math.max((song.likes || 0) - 1, 0);
        }

        await Promise.all([
            song.save(),
            currentUser.save(),
            song.populate("likedBy")
        ]);

        res.status(200).json({
            likes: song.likes,
            liked: !alreadyLiked,
            likedByUsers: song.likedBy
        });
    } catch (error) {
        console.error("Error in toggleLike", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export const addToRecentlyPlayed = async (req, res) => {
  try {
    const { userId } = req.auth();
    const { songId } = req.params;

    if (!songId) {
      return res.status(400).json({ message: "Invalid request" });
    }

    const user = await User.findOne({ clerkId: userId });
    const song = await Song.findById(songId);

    if (!user || !song) {
      return res.status(404).json({ message: "User or song not found" });
    }

    // filter and give other songs exept the song is equls to song._id
    user.recentlyPlayed = user.recentlyPlayed.filter(id => !id.equals(song._id));

    user.recentlyPlayed.unshift(song._id);

    if (user.recentlyPlayed.length > 20) {
      user.recentlyPlayed = user.recentlyPlayed.slice(0, 20);
    }

    await user.save();
    await user.populate("recentlyPlayed");

    // u => user
    const alreadyPlayed = song.playedBy?.some(u => u.equals(user._id));

    if(!alreadyPlayed){
        song.playedBy.push(user._id);
        song.playCount = (song.playCount || 0) + 1;
        await song.save();
    }
        
    await song.populate("playedBy");

    res.status(200).json({ 
        recentlyPlayedSongs: user.recentlyPlayed,
        playedByUsers: song.playedBy, 
        totalCounts: song.playedBy.length
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};