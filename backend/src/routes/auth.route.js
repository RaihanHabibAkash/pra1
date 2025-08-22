import { Router } from "express";
import { authCallback } from "../controllers/auth.controller.js";

const router = Router();

router.post("/", authCallback);

export default router;