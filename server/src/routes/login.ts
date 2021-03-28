import bcrypt from 'bcrypt';
import express, { NextFunction, Request, Response } from 'express';
import { sign } from 'jsonwebtoken';
import userRepository from '../repository/userRepository';
import { User } from '../../types';

const router = express.Router();

router.post('/', async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const userToValidate = req.body as User;
    const user = await userRepository.findByUsername(userToValidate.username);
    const passwordsMatch = await bcrypt.compare(userToValidate.password, user.password);

    if (!(user && passwordsMatch)) {
      throw ({
        name: 'ValidationError',
        message: 'Invalid username or password',
      }) as Error;
    }

    const userForToken = {
      username: user.username,
      id: user.id,
    };
    const token = sign(
      userForToken,
      process.env.SECRET as string,
      { expiresIn: 60 * 60 }, // Token expires in one hour
    );

    res.status(200).send({
      token, username: userForToken.username, id: userForToken.id,
    });
  } catch (error) {
    next(error);
  }
});

export default router;
