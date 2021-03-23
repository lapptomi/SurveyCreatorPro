import bcrypt from 'bcrypt';
import { pool } from '../config/dbconfig';
import { NewUser } from '../types';

const getAll = async (): Promise<NewUser[]> => {
  try {
    const result = await pool.query('SELECT * FROM Users');
    return result.rows as Array<NewUser>;
  } catch (error) {
    throw new Error(error);
  }
};

const create = async (user: NewUser): Promise<NewUser> => {
  const query = ('INSERT INTO Users (email, username, password, gender) VALUES ($1, $2, $3, $4)');
  const passwordHash = await bcrypt.hash(user.password, 10);
  const values = [user.email, user.username, passwordHash, user.gender];
  await pool.query(query, values);

  return {
    email: user.email,
    username: user.username,
    password: passwordHash,
    gender: user.gender,
  };
};

const findByUsername = async (username: string): Promise<NewUser> => {
  const query = ('SELECT * FROM Users WHERE (username = $1)');
  const result = await pool.query(query, [username]);
  if (result.rowCount === 0) throw new Error('User not found');

  return result.rows[0] as NewUser;
};

export default {
  getAll,
  create,
  findByUsername,
};
