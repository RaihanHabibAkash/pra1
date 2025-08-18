import express from "express";
import dotenv from "dotenv";

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