import { User } from "../models/user.model.js";

export const protectRoute = (req, res, next) => {
    if(!req.auth.userId){
        return res.status(401).json({ message: "You must log in" })
    }
    next();
}


export const requireAdmin = async (req, res, next) => {
    try {
        const id = req.auth.userId;
        const user = await User.findOne({ clerkId: id });
        if(!user) {
            return res.status(400).json({ message: "You must log In" })
        }

        const adminEmails = process.env.EMAIL_ADDRESS;
        const admins = adminEmails.split(",").map(email => email.trim());

        const isAdmin = admins.includes(user.email);
        if(!isAdmin){
            return res.status(403).json({ message: "You must be admin to access" });
        }
        next();
    } catch (error) {
        console.log("Error in requireAdmin function", error);
        res.status(500).json({ message: "Internal Server error" });
    }
}