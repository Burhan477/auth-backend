// src/utils/jwt.js
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

dotenv.config(); // This forces Node to read your .env file right now!

// Now this will correctly grab your secure key instead of the fallback
const JWT_SECRET = process.env.JWT_SECRET || 'supersecretkey';

export const generateToken = (userId) => {
  return jwt.sign(
    { userId },
    JWT_SECRET,
    { expiresIn: "1d" } // Increased to 1 day so it doesn't expire while you test!
  );
};

export const verifyToken = (token) => {
  return jwt.verify(token, JWT_SECRET);
};