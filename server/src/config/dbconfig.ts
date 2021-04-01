import { Pool } from 'pg';

const connectionString = process.env.NODE_ENV === 'test'
  ? process.env.DATABASE_URL as string
  : process.env.DATABASE_URL as string;

export const pool = new Pool({
  connectionString,
  ssl: { rejectUnauthorized: false },
});
