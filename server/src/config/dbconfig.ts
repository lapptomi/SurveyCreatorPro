import { Pool } from 'pg';

const connectionString = process.env.DATABASE_URL;

const sslConfig = process.env.NODE_ENV === ('development' || 'test')
  ? false
  : { rejectUnauthorized: false };

export const pool = new Pool({
  connectionString,
  ssl: sslConfig,
});
