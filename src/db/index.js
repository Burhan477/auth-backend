import { Pool } from "pg";

const NEON_DB_URL = process.env.NEON_DB_URL

const LOCAL_DB_URL = process.env.LOCAL_DB_URL

export const pool = new Pool({
  connectionString: NEON_DB_URL,
  ssl: { rejectUnauthorized: false },
  // connectionString: LOCAL_DB_URL,
  // ssl: false,
});

console.log(
  ` Connected to ${process.env.USE_NEON ? "Neon PostgreSQL" : "local PostgreSQL"}`
);

