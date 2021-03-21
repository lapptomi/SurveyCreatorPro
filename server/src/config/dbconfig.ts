import { Pool } from 'pg';

// [database type]://[username]:[password]@[host]:[port]/[database name]
const connectionString = process.env.DB_URL as string;

export const pool = new Pool({
  connectionString,
});
