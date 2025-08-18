import { User } from "../models/user.model.js";

export const authCallback = async (req, res) => {
    try {
        const { id, firstName, lastName, imageUrl } = req.body;

        // Checking if user exits, than LogIN
        const user = await User.findOne({clerkId: id});

        // If user does't exits, SignUP
        if(!user){
            await User.create({
                clerkId: id,
                fullName: `${firstName} ${lastName}`,
                imageUrl
            });
        }
        res.status(200).json({sucess: true});
    } catch (error) {
        console.log("Error in authCallback", error);
        res.status(500).json({message: "Internal server error", error});
    }
};  