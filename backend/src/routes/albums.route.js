import { Router } from "express";
import { getAlbumById, getAlbums } from "../controllers/album.controller.js";
import { protectRoute } from "../middlewere/auth.middlewere.js";

const router = Router();

router.use(protectRoute);

router.get("/" , getAlbums);
router.get("/:albumId", getAlbumById); 

export default router;