import { pool } from '../config/dbconfig';
import { NewUser } from '../types';

const getAll = async (): Promise<Array<string>> => {
  try {
    const result = await pool.query('SELECT * FROM Users');
    return result.rows as Array<string>;
  } catch (error) {
    throw new Error(error);
  }
};

const create = async (user: NewUser): Promise<void> => {
  const query = ('INSERT INTO Users (email, username, password, gender) VALUES ($1, $2, $3, $4)');
  const values = [user.email, user.username, user.password, user.gender];
  await pool.query(query, values);
};

export default {
  getAll,
  create,
};
