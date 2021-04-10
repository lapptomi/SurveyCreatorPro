import express from 'express';
import userRepository from '../repository/userRepository';
import { NewUser } from '../../types';
import { toNewUser } from '../utils';

const router = express.Router();

router.get('/', async (_req, res, next): Promise<void> => {
  try {
    const users = await userRepository.getAll();
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next): Promise<void> => {
  try {
    const newUser: NewUser = toNewUser(req.body);
    const createdUser = await userRepository.create(newUser);
    res.send(createdUser);
  } catch (error) {
    next(error);
  }
});

export default router;
