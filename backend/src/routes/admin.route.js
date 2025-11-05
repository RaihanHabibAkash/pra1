import { Router } from "express";
import { checkAdmin, createSong, deleteSong } from "../controllers/admin.controller.js";
import { protectRoute, requireAdmin } from "../middlewere/auth.middlewere.js";

const router = Router();

router.use(protectRoute, requireAdmin);

router.get("/check-admin", checkAdmin);

router.post("/songs", createSong);
router.delete("/songs/:id", deleteSong);



export default router;