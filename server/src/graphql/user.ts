/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable arrow-body-style */
import bcrypt from 'bcrypt';
import { UserInputError } from 'apollo-server-express';
import { IUser, NewUser } from '../types';
import User from '../models/user';
import { toNewUser } from '../utils';

export const typeDef = `
  type User {
    id: ID!
    email: String!
    password: String!
  }

  extend type Query {
    allUsers: [User!]!
  }

  extend type Mutation {
    addUser(
      email: String!
      password: String!
    ): User
  }
`;

export const resolvers = {
  Query: {
    allUsers: async (): Promise<Array<IUser>> => {
      return await User.find({}) as Array<IUser>;
    },
  },
  Mutation: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    addUser: async (_root: any, args: NewUser): Promise<IUser> => {
      try {
        // Check that the user object has valid fields or throw error if not
        toNewUser(args);

        const newUser = new User({
          email: args.email,
          password: await bcrypt.hash(args.password, 10),
        }) as NewUser;

        const addedUser = await User.create(newUser);
        return addedUser;
      } catch (error) {
        console.log('Error creating new user:', (error as Error).message);
        throw new UserInputError((error as Error).message, {
          invalidArgs: args,
        });
      }
    },
  },
};
