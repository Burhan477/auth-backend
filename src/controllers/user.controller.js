import { pool } from "../db/index.js";
import bcrypt from "bcrypt";

export const createUser = async (req, res) => {
  // 1. Extract name from the request body
  const { name, email, password } = req.body;
  // Assuming your authMiddleware attaches the logged-in user's ID to req.userId
  const creatorId = req.userId; 

  try {
    const salt = await bcrypt.genSalt(10);
    const password_hash = await bcrypt.hash(password, salt);

    // 2. Add name to the INSERT query and RETURNING clause
    const result = await pool.query(
      "INSERT INTO users (name, email, password_hash, created_by) VALUES ($1, $2, $3, $4) RETURNING id, name, email, created_at",
      [name, email, password_hash, creatorId]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error creating user. Email might already exist." });
  }
};

export const getAllusers = async (req, res) => {
  // Grab the logged-in user's ID from the middleware
  const creatorId = req.userId;

  try {
    // 3. Add name to the SELECT query
    const result = await pool.query(
      "SELECT id, name, email, created_at FROM users WHERE created_by = $1 ORDER BY created_at DESC",
      [creatorId]
    );

    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error fetching users" });
  }
};

export const getUserById = async (req, res) => {
  const { id } = req.params;
  
  try {
    // 4. Add name to the SELECT query
    const result = await pool.query(
      "SELECT id, name, email, created_at FROM users WHERE id = $1",
      [id]
    );
    
    if (result.rows.length === 0) {
        return res.status(404).json({ error: "User not found" });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error fetching user" });
  }
};

export const updateUser = async (req, res) => {
  const { id } = req.params;
  // 5. Extract name from the request body
  const { name, email, password } = req.body;

  try {
    let query;
    let values;

    if (password) {
      // If the admin typed a new password, hash it before saving
      const salt = await bcrypt.genSalt(10);
      const password_hash = await bcrypt.hash(password, salt);
      
      // 6. Update name along with email and password
      query = "UPDATE users SET name=$1, email=$2, password_hash=$3 WHERE id=$4 RETURNING id, name, email";
      values = [name, email, password_hash, id];
    } else {
      // If the password field was left blank, only update the name and email
      query = "UPDATE users SET name=$1, email=$2 WHERE id=$3 RETURNING id, name, email";
      values = [name, email, id];
    }

    const result = await pool.query(query, values);
    
    if (result.rows.length === 0) {
        return res.status(404).json({ error: "User not found" });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error updating user" });
  }
};

export const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query("DELETE FROM users WHERE id=$1 RETURNING id", [id]);
    
    if (result.rows.length === 0) {
        return res.status(404).json({ error: "User not found" });
    }

    res.json({ message: "User deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error deleting user" });
  }
};