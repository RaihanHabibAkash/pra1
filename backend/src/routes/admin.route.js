import { Router } from "express";
import { createSong } from "../controllers/admin.controller.js";
import { protectRoute, requireAdmin } from "../middlewere/auth.middlewere.js";

const router = Router();

router.post("/songs", protectRoute, requireAdmin, createSong);

export default router;