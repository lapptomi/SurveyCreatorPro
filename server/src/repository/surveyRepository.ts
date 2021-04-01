import { pool } from '../config/dbconfig';
import { NewSurvey, Survey } from '../../types';

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

const create = async (survey: NewSurvey): Promise<Survey> => {
  const query = ('INSERT INTO Surveys (title, description, private) VALUES ($1, $2, $3) RETURNING id');
  const values = [survey.title, survey.description, survey.private];
  const result = await pool.query(query, values);
  const surveyID = result.rows[0] as Survey;

  return {
    id: surveyID.id,
    title: survey.title,
    description: survey.description,
    questions: survey.questions,
    private: survey.private,
  };
};

export default {
  getAll,
  create,
  deleteAll,
};
