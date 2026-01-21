import { pool } from "../db/index.js";

export const createItem = async (req, res) => {
  const { title, description } = req.body;

  await pool.query(
    "INSERT INTO items (user_id, title, description) VALUES ($1, $2, $3)",
    [req.userId, title, description]
  );

  res.status(201).json({ message: "Item created" });
};

export const getItems = async (req, res) => {
  const result = await pool.query(
    "SELECT * FROM items WHERE user_id = $1 ORDER BY created_at DESC",
    [req.userId]
  );

  res.json(result.rows);
};

export const updateItem = async (req, res) => {
  const { title, description } = req.body;
  const { id } = req.params;

  await pool.query(
    "UPDATE items SET title=$1, description=$2 WHERE id=$3 AND user_id=$4",
    [title, description, id, req.userId]
  );

  res.json({ message: "Item updated" });
};

export const deleteItem = async (req, res) => {
  const { id } = req.params;

  await pool.query(
    "DELETE FROM items WHERE id=$1 AND user_id=$2",
    [id, req.userId]
  );

  res.json({ message: "Item deleted" });
};
