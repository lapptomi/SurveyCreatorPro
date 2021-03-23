import bcrypt from 'bcrypt';
import express, { Request, Response } from 'express';
import { sign } from 'jsonwebtoken';
import userRepository from '../repository/userRepository';
import { NewUser } from '../types';

const router = express.Router();

router.post('/', (req: Request, res: Response) => {
  const userToValidate = req.body as NewUser;
  // change to async ?
  userRepository.findByUsername(userToValidate.username)
    .then((user) => {
      bcrypt.compare(userToValidate.password, user.password)
        .then((correctPassword) => {
          if (correctPassword) {
            const token = sign(user.username, process.env.SECRET as string);
            return res.status(200).send({
              token, username: user.username,
            });
          }
          return res.status(401).json('Invalid credentials');
        })
        .catch((e) => {
          console.log((e as Error).message);
        });
    })
    .catch((e) => res.status(401).json((e as Error).message));
});

export default router;
