import axios from 'axios';
import { NewUser, User } from '../types';

const baseUrl = '/api/users';

const getAll = async (): Promise<NewUser[]> => {
  const { data } = await axios.get<User[]>(baseUrl);
  return data;
};

const create = async (newUser: NewUser): Promise<NewUser> => {
  const { data } = await axios.post<NewUser>(baseUrl, newUser);
  return data;
};

export default {
  getAll,
  create
};