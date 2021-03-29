import { Pool } from 'pg';

const connectionString = process.env.NODE_ENV === 'test'
  ? process.env.TEST_DATABASE_URL as string
  : process.env.DATABASE_URL as string;

/*
const sslConfig = process.env.NODE_ENV as string === 'production'
  ? { rejectUnauthorized: false }
  : false;
*/

export const pool = new Pool({
  connectionString,
  ssl: { rejectUnauthorized: false },
});
