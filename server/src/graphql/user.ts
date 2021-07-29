/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable arrow-body-style */
import { UserInputError } from 'apollo-server-express';
import { IUser, NewUser } from '../types';
import User from '../models/User';
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
    allUsers: async (): Promise<Array<IUser>> => User.find({}),
  },
  Mutation: {
    addUser: async (_root: unknown, args: NewUser): Promise<IUser> => {
      try {
        const newUser = await toNewUser(args);

        const addedUser = await User.create(newUser);
        return addedUser;
      } catch (error) {
        console.log('Error creating new user:', (error as Error).message);
        if ((error as Error).message.includes('duplicate key error collection')) {
          throw new Error('Email is already taken');
        }
        throw new UserInputError((error as Error).message, {
          invalidArgs: args,
        });
      }
    },
  },
};
