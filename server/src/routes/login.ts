import bcrypt from 'bcrypt';
import express, { Request, Response } from 'express';
import { sign } from 'jsonwebtoken';
import userRepository from '../repository/userRepository';
import { User } from '../types';

const router = express.Router();

router.post('/', (req: Request, res: Response) => {
  const userToValidate = req.body as User;
  // change to async ?
  userRepository.findByUsername(userToValidate.username)
    .then((user) => {
      bcrypt.compare(userToValidate.password, user.password)
        .then((correctPassword) => {
          if (correctPassword) {
            const userForToken = {
              username: user.username,
              id: user.id,
            };
            const token = sign(
              userForToken,
              process.env.SECRET as string,
              { expiresIn: 60 * 60 }, // Token expires in one hour
            );
            return res.status(200).send({
              token, username: userForToken.username, id: userForToken.id,
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
