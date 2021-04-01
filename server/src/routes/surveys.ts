import express, { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import surveyRepository from '../repository/surveyRepository';
import { NewSurvey, User } from '../../types';
import { toNewSurvey } from '../utils';
import questionRepository from '../repository/questionRepository';

const router = express.Router();

router.get('/', async (_req: Request, res: Response): Promise<void> => {
  try {
    const surveys = await surveyRepository.getAll();
    res.status(200).json(surveys);
  } catch (e) {
    res.status(400).json('Could not get surveys');
  }
});

router.post('/', async (req: Request, res: Response): Promise<void> => {
  try {
    const token = req.token as string;
    const decodedToken = jwt.verify(token, process.env.SECRET as string) as User;

    if (!token || !decodedToken.id) throw new Error('token is missing or invalid');

    const surveyToAdd = toNewSurvey(req.body as NewSurvey);
    const addedSurvey = await surveyRepository.create(surveyToAdd);

    surveyToAdd.questions.forEach(async (question) => {
      await questionRepository.create(question, addedSurvey.id);
    });

    res.status(201).json(addedSurvey);
  } catch (e) {
    console.log((e as Error).message);
    res.status(400).json((e as Error).message);
  }
});

export default router;
