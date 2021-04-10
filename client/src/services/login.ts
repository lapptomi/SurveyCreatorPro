import axios from 'axios';

const baseUrl = '/api/login';

interface LoginCredentials {
  email: string;
  password: string;
}

interface Token {
  token: string;
  username: string;
}

const logout = (): void => {
  if (window.confirm('Are you sure you want to log out?')) {
    window.localStorage.clear();
    window.location.replace('/');
  }
};

const login = async (credentials: LoginCredentials): Promise<Token> => {
  const { data } = await axios.post(baseUrl, credentials);
  return data;
};

export default {
  login,
  logout
};