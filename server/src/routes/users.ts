import express, { Request, Response } from 'express';
import { getAll } from '../repository/userRepository';

const router = express.Router();

router.get('/', (_req: Request, res: Response) => {
  getAll()
    .then((users) => res.status(200).json(users).end())
    .catch(() => res.status(400).end());
});

export default router;
