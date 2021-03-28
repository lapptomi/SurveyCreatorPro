import express, { Request, Response } from 'express';
import userRepository from '../repository/userRepository';
import { NewUser } from '../types';
import { toNewUser } from '../utils';

const router = express.Router();

router.get('/', async (_req: Request, res: Response): Promise<void> => {
  try {
    const users = await userRepository.getAll();
    res.status(200).json(users);
  } catch (e) {
    res.status(404).send((e as Error).message);
  }
});

router.post('/', async (req: Request, res: Response): Promise<void> => {
  try {
    const newUser: NewUser = toNewUser(req.body);
    const createdUser = await userRepository.create(newUser);
    res.send(createdUser);
  } catch (e) {
    res.status(400).send((e as Error).message);
  }
});

export default router;
