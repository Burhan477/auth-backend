// src/db/index.js
import pkg from "pg";
import dotenv from "dotenv";

dotenv.config();

const { Pool } = pkg;

export const pool = new Pool({
  // Vercel Postgres automatically injects POSTGRES_URL into your environments
  // We use the fallback to DATABASE_URL just in case you use that for local testing
  connectionString: process.env.POSTGRES_URL || process.env.DATABASE_URL,
  
  // SSL is required for Vercel Postgres to connect securely
  ssl: {
    rejectUnauthorized: false, 
  },
});

pool.on('connect', () => {
  console.log('✅ Successfully connected to Vercel PostgreSQL');
});

pool.on('error', (err) => {
  console.error('❌ Unexpected database error on idle client', err);
});