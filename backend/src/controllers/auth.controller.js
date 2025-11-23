import { User } from "../models/user.model.js";

// export const authCallback = async (req, res) => {
//     try {
//         const { id, firstName, lastName, imageUrl } = req.body;

//         // Checking if user exits, than LogIN
//         const user = await User.findOne({ clerkId: id });

//         // If user does't exits, SignUP
//         if(!user){
//             await User.create({
//                 clerkId: id,
//                 fullName: `${firstName || ""} ${lastName || ""}`.trim(),
//                 imageUrl
//             });
//         }

//         res.status(200).json({
//             success: true,
//             message: "Welcome",
//             user
//         });
//     } catch (error) {
//         console.log("Error in authCallback", error);
//         res.status(500).json({message: "Internal server error", error});
//     }
// };  


export const authCallback = async (req, res) => {
    try {
        const { id, firstName, lastName, imageUrl } = req.body;

    // Atomic find-or-create using upsert
    const user = await User.findOneAndUpdate(
      { clerkId: id },
      {
        $setOnInsert: {
          fullName: `${firstName || ""} ${lastName || ""}`.trim(),
          imageUrl
        }
      },
      { new: true, upsert: true } // create if not exists
    );

    const message = user.createdAt && user.createdAt.getTime() === user.updatedAt.getTime() 
      ? "SignUp" 
      : "Log In";

    return res.status(200).json({
      success: true,
      message,
      user
    });
    } catch (error) {
        console.log("Error in authCallback", error);
        res.status(500).json({message: "Internal server error", error});
    }
};  