import axios from 'axios';

const baseUrl = '/api/login';

interface LoginCredentials {
  username: string;
  password: string;
}

interface Token {
  token: string;
  username: string;
}

const login = async (credentials: LoginCredentials): Promise<Token> => {
  const { data } = await axios.post(baseUrl, credentials);
  return data;
};

export default {
  login,
};