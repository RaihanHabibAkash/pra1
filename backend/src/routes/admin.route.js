import { Router } from "express";
import { checkAdmin, createSong, deleteSong, getAllSongs } from "../controllers/admin.controller.js";
import { protectRoute, requireAdmin } from "../middlewere/auth.middlewere.js";

const router = Router();

// router.use(protectRoute, requireAdmin);

router.get("/", checkAdmin);
router.get("/songs", getAllSongs);
router.post("/create-song", createSong);
router.delete("/songs/:id", deleteSong);



export default router;