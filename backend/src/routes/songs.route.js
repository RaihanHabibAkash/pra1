import { Router } from "express";
import { protectRoute, requireAdmin } from "../middlewere/auth.middlewere.js";
import { addToRecentlyPlayed, getAllSongs, getFeaturedSongs, getMadeForYouSongs, getRecentlyPlayedSongs, getTrendingSongs } from "../controllers/song.controller.js";

const router = Router();

router.get("/", protectRoute, requireAdmin, getAllSongs);
router.get("/fetured-songs", protectRoute, getFeaturedSongs);
router.get("/made-for-you-songs", protectRoute, getMadeForYouSongs);
router.get("/trending-songs", protectRoute, getTrendingSongs);
router.post("/:songId", protectRoute, addToRecentlyPlayed);
router.get("/recently-played-songs", protectRoute, getRecentlyPlayedSongs);

export default router;