import pkg from "pg";
const { Pool } = pkg;

const DATABASE_URL = "postgresql://neondb_owner:npg_X8UZQa2pGcyV@ep-snowy-base-ah0wir2m-pooler.c-3.us-east-1.aws.neon.tech/neondb?sslmode=require"
console.log("DATABASE_URL:", DATABASE_URL);

export const pool = new Pool({
  connectionString: DATABASE_URL,
  ssl: {
    rejectUnauthorized: false, // ✅ REQUIRED for Neon
  },
});
