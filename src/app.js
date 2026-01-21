import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes.js";
import itemRoutes from "./routes/item.routes.js";
import { pool } from "./db/index.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/items", itemRoutes);

app.get("/api", (req, res) => {
  res.send("API is running");
});

app.get("/db-test", async (req, res) => {
  const r = await pool.query("SELECT NOW()");
  res.json(r.rows[0]);
});

export default app;
