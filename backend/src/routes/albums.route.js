import { Router } from "express";
import { createAlbum, deleteAlbum, getAlbumById, getAlbums } from "../controllers/album.controller.js";
import { protectRoute } from "../middlewere/auth.middlewere.js";

const router = Router();

router.use(protectRoute);

router.get("/" , getAlbums);
router.get("/:albumId", getAlbumById);
router.post("/albums", createAlbum);
router.delete("/albums/:id", deleteAlbum);

export default router;