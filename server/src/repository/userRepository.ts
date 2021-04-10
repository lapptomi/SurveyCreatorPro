import bcrypt from 'bcrypt';
import { pool } from '../config/dbconfig';
import { NewUser, IUser } from '../../types';
import User from '../models/user';

const getAll = async (): Promise<Array<IUser>> => {
  const users = await User.find({}) as Array<IUser>;
  return users;
};

const create = async (newUser: NewUser): Promise<NewUser> => {
  const user = new User({
    email: newUser.email,
    username: newUser.username,
    password: await bcrypt.hash(newUser.password, 10),
    gender: newUser.gender,
  }) as NewUser;

  const savedUser = await User.create(user) as NewUser;
  return savedUser;
};

const findByUsername = async (username: string): Promise<IUser> => {
  const query = ('SELECT * FROM Users WHERE (username = $1)');
  const result = await pool.query(query, [username]);
  if (result.rowCount === 0) {
    throw {
      name: 'UserNotFound',
      message: `Could not find user with username ${username}`,
    } as Error;
  }
  return result.rows[0] as IUser;
};

const deleteAll = async (): Promise<void> => {
  if (process.env.NODE_ENV === 'test') {
    const query = ('DELETE FROM Users');
    await pool.query(query);
  }
};

export default {
  getAll,
  create,
  findByUsername,
  deleteAll,
};
