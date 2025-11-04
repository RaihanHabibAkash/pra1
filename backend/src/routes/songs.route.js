import { Router } from "express";
import { protectRoute, requireAdmin } from "../middlewere/auth.middlewere.js";
import { getAllSongs, getFeaturedSongs, getLikedSongs, getMadeForYouSongs, getRecentlyPlayedSongs, getTrendingSongs, matchedGenre, matchedLanguage } from "../controllers/song.controller.js";

const router = Router();

router.get("/", protectRoute, requireAdmin, getAllSongs);
router.get("/fetured-songs", protectRoute, getFeaturedSongs);
router.get("/made-for-you-songs", protectRoute, getMadeForYouSongs);
router.get("/trending-songs", protectRoute, getTrendingSongs);
router.get("/fav-genre-songs", protectRoute, matchedGenre);
router.get("/fav-language-songs", protectRoute, matchedLanguage);
router.get("/liked-songs", protectRoute, getLikedSongs);
router.get("/recently-played-songs", protectRoute, getRecentlyPlayedSongs);

export default router;