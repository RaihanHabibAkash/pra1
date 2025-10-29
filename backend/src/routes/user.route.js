import { Router } from "express";
import { protectRoute, requireAdmin } from "../middlewere/auth.middlewere.js";
import { getAllUsers } from "../controllers/user.controller.js";

const router = Router();

router.get("/", protectRoute, requireAdmin, getAllUsers);

export default router;