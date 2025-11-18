import express from "express";
import dotenv from "dotenv";
import { clerkMiddleware } from "@clerk/express";
import fileUpload from "express-fileupload";
import cors from "cors";

// build in node module
import path from "path";

// Routes import
import userRoute from "./routes/user.route.js";
import adminRoute from "./routes/admin.route.js";
import albumsRoute from "./routes/albums.route.js";
import authRoute from "./routes/auth.route.js";
import songsRoute from "./routes/songs.route.js";
import statsRoute from "./routes/stats.route.js";

// Connection to MongoDB
import { connectionDB } from "./lib/db.js";

dotenv.config();
const PORT = process.env.PORT || 7000;
const app = express();

// Cross Origin
app.use(cors({
    origin: "http://localhost:9000",
    credentials: true
}));

// Current file directory
const __dirname = path.resolve();

// For req.body to parse JSON comming from frontend
app.use(express.json());

// For add auth in req => req.auth
app.use(clerkMiddleware());

app.use(fileUpload({
    // file will be temp file on disk of PC 
    useTempFiles: true, 
    // new folder "temp_file" will be created inside __dirname 
    tempFileDir: path.join(__dirname, "temp_file"), 
    // if there is no folder for temp filse one new will be created
    createParentPath: true,
    limits: {
        // 8 mb max
        fileSize: 8 * 1024 * 1024 
    }
}));

// Routes
app.use("/api/user", userRoute);
app.use("/api/admin", adminRoute);
app.use("/api/albums", albumsRoute);
app.use("/api/auth", authRoute);
app.use("/api/songs", songsRoute);
app.use("/api/stats", statsRoute);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    connectionDB();
});