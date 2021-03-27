import express, { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import surveyRepository from '../repository/surveyRepository';
import { NewSurvey, User } from '../types';
import { toNewSurvey } from '../utils';

const router = express.Router();

const getTokenFrom = (request: Request): string => {
  const authorization = request.get('authorization');
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7);
  }
  return '';
};

router.get('/', (_req: Request, res: Response) => {
  surveyRepository.getAll()
    .then((surveys) => {
      res.status(200).json(surveys);
    })
    .catch((e) => {
      res.status(400).json((e as Error).message);
    });
});

// eslint-disable-next-line consistent-return
router.post('/', (req: Request, res: Response): void | Response<unknown> => {
  try {
    const token = getTokenFrom(req);

    const decodedToken = jwt.verify(token, process.env.SECRET as string) as User;
    if (!token || !decodedToken.id) {
      return res.status(401).json({ error: 'token missing or invalid' });
    }

    const surveyToAdd = toNewSurvey(req.body as NewSurvey);
    surveyRepository.create(surveyToAdd)
      .then(() => {
        return res.status(201).json(surveyToAdd);
      })
      .catch((e) => {
        return res.status(400).json((e as Error).message);
      });
  } catch (e) {
    return res.status(400).json((e as Error).message);
  }
});

export default router;
