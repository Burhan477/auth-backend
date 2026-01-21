import { Router } from "express";
import {
  createItem,
  getItems,
  updateItem,
  deleteItem,
} from "../controllers/item.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = Router();

router.use(authMiddleware);

router.post("/", createItem);
router.get("/", getItems);
router.put("/:id", updateItem);
router.delete("/:id", deleteItem);

export default router;
