import { NewSurvey, ISurvey } from '../../types';
import Survey from '../models/survey';

const getAll = async (): Promise<Array<NewSurvey>> => {
  const surveys = await Survey.find({}) as Array<NewSurvey>;
  return surveys;
};

const deleteAll = async (): Promise<void> => {
  if (process.env.NODE_ENV === 'test') {
    await Survey.deleteMany();
  }
};

const create = async (newSurvey: NewSurvey): Promise<ISurvey> => {
  const survey = new Survey({
    title: newSurvey.title,
    description: newSurvey.description,
    questions: newSurvey.questions,
    private: newSurvey.private,
  }) as NewSurvey;

  const savedSurvey = await Survey.create(survey) as NewSurvey;
  return savedSurvey;
};

export default {
  getAll,
  create,
  deleteAll,
};
