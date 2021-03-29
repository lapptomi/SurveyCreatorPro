import { pool } from '../config/dbconfig';
import { NewSurvey } from '../../types';

const getAll = async (): Promise<Array<NewSurvey>> => {
  const result = await pool.query('SELECT * FROM Surveys');
  return result.rows as Array<NewSurvey>;
};

const deleteAll = async (): Promise<void> => {
  if (process.env.NODE_ENV === 'test') {
    const query = ('DELETE FROM Surveys');
    await pool.query(query);
  }
};

const create = async (survey: NewSurvey): Promise<NewSurvey> => {
  const query = ('INSERT INTO Surveys (title, description) VALUES ($1, $2)');
  const values = [survey.title, survey.description];
  await pool.query(query, values);
  return survey;
};

export default {
  getAll,
  create,
  deleteAll,
};
