import jwt from "jsonwebtoken";

// Use environment variable, fallback to a default ONLY for local dev
const JWT_SECRET = process.env.JWT_SECRET || 'supersecretkey';

export const generateToken = (userId) => {
  return jwt.sign(
    { userId },
    JWT_SECRET,
    { expiresIn: "15m" } // Note: 15 mins is very short! You might want "1h" or "1d"
  );
};

export const verifyToken = (token) => {
  return jwt.verify(token, JWT_SECRET);
};