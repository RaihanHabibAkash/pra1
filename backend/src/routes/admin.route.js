import { Router } from "express";
import { checkAdmin, createSong, deleteSong, deleteUser, getAllSongs, getAllUsers } from "../controllers/admin.controller.js";
import { protectRoute, requireAdmin } from "../middlewere/auth.middlewere.js";

const router = Router();

// router.use(protectRoute, requireAdmin);

router.get("/", checkAdmin);
router.get("/songs", getAllSongs);
router.post("/create-song", createSong);
router.delete("/songs/:id", deleteSong);
router.get("/get-users", getAllUsers);
router.delete("/get-users/:userId", deleteUser);



export default router;