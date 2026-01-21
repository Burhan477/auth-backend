import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { pool } from "../db/index.js";

export const register = async (req, res) => {
  const { email, password } = req.body;

  const hash = await bcrypt.hash(password, 10);

  await pool.query(
    "INSERT INTO users (email, password_hash) VALUES ($1, $2)",
    [email, hash]
  );

  res.status(201).json({ message: "User registered successfully" });
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  const result = await pool.query(
    "SELECT * FROM users WHERE email = $1",
    [email]
  );

  if (!result.rows.length) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const user = result.rows[0];
  const isValid = await bcrypt.compare(password, user.password_hash);

  if (!isValid) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const token = jwt.sign(
    { userId: user.id },
    process.env.JWT_SECRET,
    { expiresIn: "15m" }
  );

  res.json({ token });
};
