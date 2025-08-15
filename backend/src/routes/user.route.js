import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
    res.send("Users route using GET method");
});

export default router;