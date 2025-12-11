import { Router } from "express";
import { protectRoute } from "../middlewere/auth.middlewere.js";
import { addToRecentlyPlayed, toggleLike } from "../controllers/user.controller.js";

const router = Router();
router.use(protectRoute);

router.post("/like/:id", toggleLike);
router.post("/:songId", addToRecentlyPlayed);

export default router;