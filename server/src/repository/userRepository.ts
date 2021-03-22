import { pool } from '../config/dbconfig';

const getAll = async (): Promise<Array<string>> => {
  try {
    const result = await pool.query('SELECT * FROM Users');
    return result.rows as Array<string>;
  } catch (error) {
    throw new Error(error);
  }
};

export default {
  getAll,
};
