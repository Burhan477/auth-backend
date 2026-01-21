import { pool } from "../config/db.js";

export const createItem = (userId, title, description) => {
  return pool.query(
    "INSERT INTO items (user_id, title, description) VALUES ($1, $2, $3)",
    [userId, title, description]
  );
};

export const getItemsByUser = (userId) => {
  return pool.query(
    "SELECT * FROM items WHERE user_id = $1 ORDER BY created_at DESC",
    [userId]
  );
};

export const updateItem = (id, userId, title, description) => {
  return pool.query(
    "UPDATE items SET title=$1, description=$2 WHERE id=$3 AND user_id=$4",
    [title, description, id, userId]
  );
};

export const deleteItem = (id, userId) => {
  return pool.query(
    "DELETE FROM items WHERE id=$1 AND user_id=$2",
    [id, userId]
  );
};
