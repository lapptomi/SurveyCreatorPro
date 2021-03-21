import { Pool } from 'pg';

// [database type]://[username]:[password]@[host]:[port]/[database name]
const connectionString = process.env.DATABASE_URL;

export const pool = new Pool({
  connectionString,
});
