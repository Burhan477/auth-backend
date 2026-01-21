import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes.js";
import itemRoutes from "./routes/item.routes.js";

const app = express();

/* Global Middlewares */
app.use(cors());
app.use(express.json());

/* Routes */
app.use("/api/auth", authRoutes);
app.use("/api/items", itemRoutes);

/* Health check */
app.get("/", (req, res) => {
  res.send("API is running");
});

export default app;
