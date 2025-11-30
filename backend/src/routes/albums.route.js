import { Router } from "express";
import { addToAlbum, createAlbum, deleteAlbum, getAlbumById, getAlbums, removeFromAlbum } from "../controllers/album.controller.js";
import { protectRoute } from "../middlewere/auth.middlewere.js";

const router = Router();

// router.use(protectRoute);

router.get("/" , getAlbums);
router.get("/:albumId", getAlbumById);
router.post("/album", createAlbum);
router.delete("/album/:id", deleteAlbum);
router.post("/all-albums/:albumId/add/:songId", addToAlbum);
router.delete("/all-ablums/:albumId/remove/:songId", removeFromAlbum);

export default router;