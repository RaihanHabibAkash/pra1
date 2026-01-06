import { Router } from "express";
import { protectRoute, requireAdmin } from "../middlewere/auth.middlewere.js";
import { getStats } from "../controllers/stats.controller.js";

const router = Router();

router.use(protectRoute, requireAdmin);

router.get("/", getStats);

export default router;