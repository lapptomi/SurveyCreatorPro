import express, { Request, Response } from 'express';
import userRepository from '../repository/userRepository';

const router = express.Router();

router.get('/', (_req: Request, res: Response) => {
  userRepository.getAll()
    .then((users) => res.status(200).json(users))
    .catch((error) => res.status(404).send({
      error: (error as Error).message,
    }));
});

export default router;
