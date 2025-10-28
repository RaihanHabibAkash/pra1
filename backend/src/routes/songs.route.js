import { Router } from "express";
import { protectRoute, requireAdmin } from "../middlewere/auth.middlewere.js";
import { getAllSongs, getFeaturedSongs, getMadeForYouSongs, getTrendingSongs } from "../controllers/song.controller.js";

const router = Router();

router.get("/", protectRoute, requireAdmin, getAllSongs);
router.get("/fetured-songs", protectRoute, getFeaturedSongs);
router.get("/made-for-you-songs", protectRoute, getMadeForYouSongs);
router.get("/trending-songs", protectRoute, getTrendingSongs);

export default router;