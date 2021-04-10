import bcrypt from 'bcrypt';
import { NewUser, IUser } from '../../types';
import User from '../models/user';

const getAll = async (): Promise<Array<IUser>> => {
  const users = await User.find({}) as Array<IUser>;
  return users;
};

const create = async (newUser: NewUser): Promise<NewUser> => {
  const user = new User({
    email: newUser.email,
    password: await bcrypt.hash(newUser.password, 10),
    gender: newUser.gender,
  }) as NewUser;

  const savedUser = await User.create(user) as NewUser;
  return savedUser;
};

const findByEmail = async (email: string): Promise<IUser> => {
  const users = await User.find({}) as Array<IUser>;
  const userToFind = users.find((u) => {
    return u.email === email;
  });
  return userToFind as IUser;
};

const deleteAll = async (): Promise<void> => {
  if (process.env.NODE_ENV === 'test') {
    await User.deleteMany();
  }
};

export default {
  getAll,
  create,
  findByEmail,
  deleteAll,
};
