import bcrypt from 'bcrypt';
import express from 'express';
import { sign } from 'jsonwebtoken';
import userRepository from '../repository/userRepository';
import { IUser } from '../../types';

const router = express.Router();

router.post('/', async (req, res, next): Promise<void> => {
  try {
    const userToValidate = req.body as IUser;
    const user = await userRepository.findByEmail(userToValidate.email);
    const passwordsMatch = await bcrypt.compare(userToValidate.password, user.password);

    if (!(user && passwordsMatch)) {
      throw ({
        name: 'ValidationError',
        message: 'Invalid username or password',
      }) as Error;
    }

    const userForToken = {
      email: user.email,
      id: user.id,
    };
    const token = sign(
      userForToken,
      process.env.SECRET as string,
      { expiresIn: 60 * 60 }, // expires in one hour
    );

    res.status(200).send({
      token, username: userForToken.email, id: userForToken.id,
    });
  } catch (error) {
    next(error);
  }
});

export default router;
