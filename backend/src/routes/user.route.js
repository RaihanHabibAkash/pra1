import { Router } from "express";
import { protectRoute, requireAdmin } from "../middlewere/auth.middlewere.js";
import { addToRecentlyPlayed, deleteUser, getAllUsers, toggleLike } from "../controllers/user.controller.js";

const router = Router();

router.get("/", protectRoute, requireAdmin, getAllUsers);
router.delete("/:userId",protectRoute, requireAdmin, deleteUser);
router.post("/like/:id", protectRoute, toggleLike);
router.post("/:songId", protectRoute, addToRecentlyPlayed);

export default router;