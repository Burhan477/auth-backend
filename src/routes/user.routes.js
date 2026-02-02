import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { getusers } from "../controllers/user.controller.js";

const router = Router();

router.use(authMiddleware);

router.get("/", getusers);

export default router;
