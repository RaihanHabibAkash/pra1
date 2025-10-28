import { clerkClient } from "@clerk/express"

export const protectRoute = (req, res, next) => {
    if(!req.auth.userId){
        res.status(401).json({message: "You must log in"})
    }
    next();
}


export const requireAdmin = async (req, res, next) => {
    try {
        const currentUser = await clerkClient.users.getUser(req.auth.userId);
        const admins = process.env.EMAIL_ADDRESS.split(",").map(email => email.trim());
        const isAdmin = admins.includes(currentUser.primaryEmailAddress?.emailAddress);

        if(!isAdmin){
            return res.status(403).json({message: "You must be admin to acess"});
        }
        next();
    } catch (error) {
        console.log("Error in requireAdmin function", error);
        res.status(500).json({message: "Internal Server error"});
    }
}