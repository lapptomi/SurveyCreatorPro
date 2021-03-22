import axios from 'axios';
import { User } from '../types';

const baseUrl = '/api/users';

const getAll = async (): Promise<User[]> => {
  const { data } = await axios.get<User[]>(baseUrl);
  return data;
};

export default {
  getAll
};