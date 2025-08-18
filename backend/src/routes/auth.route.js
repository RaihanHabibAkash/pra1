import { Router } from "express";
import { authCallback } from "../controllers/auth.controller";

const router = Router();

router.post("/", authCallback);

export default router;