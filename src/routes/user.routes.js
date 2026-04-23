// src/routes/user.routes.js
import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { 
  getAllusers, 
  createUser, 
  getUserById, 
  updateUser, 
  deleteUser 
} from "../controllers/user.controller.js";

const router = Router();

// Apply auth middleware to all routes in this file. 
// This ensures req.userId is always available for your controller logic.
router.use(authMiddleware);

// Standard REST endpoints mapped to your controller
router.get("/", getAllusers);
router.post("/", createUser);
router.get("/:id", getUserById);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

export default router;