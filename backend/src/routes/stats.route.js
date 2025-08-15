import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
    res.send("stats routes using GET method");
});

export default router;