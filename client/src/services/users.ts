import axios from 'axios';
import { User } from '../types';

const baseUrl = '/api/users';

const getAll = async (): Promise<User[]> => {
  const { data } = await axios.get<User[]>(baseUrl);
  return data;
};

const create = async (newUser: User): Promise<User> => {
  const { data } = await axios.post<User>(baseUrl, newUser);
  return data;
};

export default {
  getAll,
  create
};