import { clerkClient } from "@clerk/express";
import { User } from "../models/user.model.js";

export const authCallback = async (req, res) => {
    try {
        const { userId } = req.auth();
        const currentUser = await clerkClient.users.getUser(userId);

        const id = currentUser.id;
        const firstName = currentUser.firstName;
        const lastName = currentUser.lastName;
        const imageUrl = currentUser.imageUrl;
        const email = currentUser.primaryEmailAddress?.emailAddress;

        if(!id || !firstName || !lastName || !imageUrl || !email) {
          return res.status(400).json({ message: "Add all required fields in authCallback" })
        }

        // Checking if user exits
        let user = await User.findOne({ clerkId: id });

        // If user does't exits, SignUP
        if(!user){
            user = await User.create({
                clerkId: id,
                fullName: `${firstName} ${lastName}`,
                imageUrl,
                email
            });
        }

        res.status(200).json({
            success: true,
            message: "Welcome",
            user
        });
    } catch (error) {
        console.log("Error in authCallback", error);
        res.status(500).json({message: "Internal server error", error});
    }
};  


// export const authCallback = async (req, res) => {
//     try {
//         const { id, firstName, lastName, imageUrl } = req.body;

//     // Atomic find-or-create using upsert
//     const user = await User.findOneAndUpdate(
//       { clerkId: id },
//       {
//         $setOnInsert: {
//           fullName: `${firstName || ""} ${lastName || ""}`.trim(),
//           imageUrl
//         }
//       },
//       { new: true, upsert: true } // create if not exists
//     );

//     const message = user.createdAt && user.createdAt.getTime() === user.updatedAt.getTime() 
//       ? "SignUp" 
//       : "Log In";

//     return res.status(200).json({
//       success: true,
//       message,
//       user
//     });
//     } catch (error) {
//         console.log("Error in authCallback", error);
//         res.status(500).json({message: "Internal server error", error});
//     }
// };  