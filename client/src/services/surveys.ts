import axios from 'axios';
import { NewSurvey } from '../types';

const baseUrl = '/api/surveys';

let token = '';

const setToken = (newToken: string): void => {
  token = `bearer ${newToken}`;
};

const getAll = async (): Promise<NewSurvey[]> => {
  const { data } = await axios.get<NewSurvey[]>(baseUrl);
  return data;
};

const create = async (newSurvey: NewSurvey): Promise<NewSurvey> => {
  const config = {
    headers: { Authorization: token },
  };

  const { data } = await axios.post<NewSurvey>(
    baseUrl, newSurvey, config,
  );

  return data;
};

export default {
  getAll,
  create,
  setToken,
};
