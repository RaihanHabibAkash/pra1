import { Router } from "express";
import { protectRoute } from "../middlewere/auth.middlewere.js";
import { getFeaturedSongs, getLikedSongs, getMadeForYouSongs, getRecentlyPlayedSongs, getTrendingSongs, matchedGenre, matchedLanguage } from "../controllers/song.controller.js";

const router = Router();

router.use(protectRoute);

router.get("/fetured-songs", getFeaturedSongs);
router.get("/made-for-you-songs", getMadeForYouSongs);
router.get("/trending-songs", getTrendingSongs);
router.get("/fav-genre-songs", matchedGenre);
router.get("/fav-language-songs", matchedLanguage);
router.get("/liked-songs", getLikedSongs);
router.get("/recently-played-songs", getRecentlyPlayedSongs);

export default router;