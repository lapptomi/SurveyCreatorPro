import bcrypt from 'bcrypt';
import { NewUser } from '../../types';
import User, { IUserSchema } from '../models/user';

const getAll = async (): Promise<Array<IUserSchema>> => {
  const users = await User.find({});
  return users;
};

const create = async (newUser: NewUser): Promise<NewUser> => {
  const user = new User({
    email: newUser.email,
    password: await bcrypt.hash(newUser.password, 10),
  }) as NewUser;

  const savedUser = await User.create(user) as NewUser;
  return savedUser;
};

const findByEmail = async (userEmail: string): Promise<IUserSchema> => {
  const user = await User.findOne({ email: userEmail });
  if (!user) {
    throw new Error(`Could not find user with email: ${userEmail}`);
  }
  return user;
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
