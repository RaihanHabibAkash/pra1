import { Router } from "express";
import { addToAlbum, createAlbum, deleteAlbum, getAlbumById, getAlbums, removeFromAlbum } from "../controllers/album.controller.js";
import { protectRoute } from "../middlewere/auth.middlewere.js";

const router = Router();

router.use(protectRoute);

router.get("/" , getAlbums);
router.get("/:albumId", getAlbumById);
router.post("/albums", createAlbum);
router.delete("/albums/:id", deleteAlbum);
router.post("/albums/add-to/:songId", addToAlbum);
router.delete("/ablums/remove/:songId", removeFromAlbum);

export default router;