import { pool } from "../config/db.js";

export const createUser = (email, passwordHash) => {
  return pool.query(
    "INSERT INTO users (email, password_hash) VALUES ($1, $2)",
    [email, passwordHash]
  );
};

export const findUserByEmail = (email) => {
  return pool.query(
    "SELECT * FROM users WHERE email = $1",
    [email]
  );
};

export const findUserById = (id) => {
  return pool.query(
    "SELECT id, email FROM users WHERE id = $1",
    [id]
  );
};
