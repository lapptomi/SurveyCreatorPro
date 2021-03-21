import { QueryResult } from 'pg';
import { pool } from '../config/dbconfig';

export const getAll = async (): Promise<Array<string>> => {
  try {
    const response: QueryResult = await pool.query('SELECT * FROM Users');
    return response.rows as Array<string>;
  } catch (error) {
    console.log((error as Error).message);
    throw new Error('Error getting all users from database');
  }
};
