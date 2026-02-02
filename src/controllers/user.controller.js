

export const getusers = async (req, res) => {
  const result = await pool.query(
    "SELECT * FROM users ORDER BY created_at DESC",
    [req.userId]
  );

  res.json(result.rows);
};