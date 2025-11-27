import { Router } from "express";
import { protectRoute } from "../middlewere/auth.middlewere.js";
import { addToRecentlyPlayed, toggleLike } from "../controllers/user.controller.js";

const router = Router();

router.post("/like/:id", protectRoute, toggleLike);
router.post("/:songId", protectRoute, addToRecentlyPlayed);

export default router;