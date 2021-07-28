/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable arrow-body-style */
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { IToken } from '../types';
import User from '../models/User';

interface LoginArgs {
  email: string;
  password: string;
}

export const typeDef = `
  type Token {
    id: ID!
    token: String!
  }

  extend type Mutation {
    login(
      email: String!
      password: String!
    ): Token
  }
`;

export const resolvers = {
  Mutation: {
    login: async (_root: unknown, args: LoginArgs): Promise<IToken> => {
      const user = await User.findOne({ email: args.email });
      if (!user) {
        throw new Error('User not found');
      }

      const passwordsMatch = await bcrypt.compare(args.password, user.password);
      if (!passwordsMatch) {
        throw new Error('Invalid username or password');
      }

      const userForToken = {
        id: user.id as string,
      } as IToken;

      const newToken = jwt.sign(
        userForToken,
        process.env.SECRET as string,
        { expiresIn: 60 * 60 }, // expires in 1h
      );

      return {
        id: user.id as string,
        token: newToken,
      };
    },
  },
};
