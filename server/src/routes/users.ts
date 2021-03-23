import express, { Request, Response } from 'express';
import userRepository from '../repository/userRepository';
import { NewUser } from '../types';
import { toNewUser } from '../utils';

const router = express.Router();

router.get('/', (_req: Request, res: Response) => {
  userRepository.getAll()
    .then((users) => res.status(200).json(users))
    .catch((e) => res.status(404).send({
      error: (e as Error).message,
    }));
});

router.post('/', (req: Request, res: Response) => {
  try {
    const newUser: NewUser = toNewUser(req.body);
    userRepository.create(newUser)
      .then((result) => res.status(201).json(result))
      .catch((e) => res.status(400).send((e as Error).message));
  } catch (e) {
    res.status(400).send((e as Error).message);
  }
});

export default router;
