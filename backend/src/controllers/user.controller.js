import { User } from "../models/user.model.js";

export const getAllUsers = async (req, res) => {
    try {
        const currentUser = req.auth.userId;
        const users = await User.find({ clerkId: {$ne: currentUser} });
        if(users.length == 0){
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({ users });
    } catch (error) {
        console.log("Error in getAllUsers", error);
        res.status(500).json({ message: "Internal server error"})
    }
}