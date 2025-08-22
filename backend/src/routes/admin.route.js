import { Router } from "express";
import { getAdmin } from "../controllers/admin.controller.js";
import { requireAdmin } from "../middlewere/auth.middlewere.js";

const router = Router();

router.get("/" , requireAdmin, getAdmin);

export default router;