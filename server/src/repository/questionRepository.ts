import { pool } from '../config/dbconfig';

const getAll = async (): Promise<Array<string>> => {
  const result = await pool.query('SELECT * FROM Questions');
  return result.rows as Array<string>;
};

const deleteAll = async (): Promise<void> => {
  if (process.env.NODE_ENV === 'test') {
    const query = ('DELETE FROM Questions');
    await pool.query(query);
  }
};

const create = async (question: string, surveyID: number): Promise<void> => {
  const query = ('INSERT INTO Questions (survey_id, question) VALUES ($1, $2)');
  const values = [surveyID, question];
  await pool.query(query, values);
};

export default {
  getAll,
  create,
  deleteAll,
};
