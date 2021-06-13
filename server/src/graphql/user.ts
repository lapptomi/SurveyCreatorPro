/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable arrow-body-style */
import { UserInputError } from 'apollo-server-express';
import User from '../models/user';
import userRepository from '../repository/userRepository';
import { toNewUser } from '../utils';

interface AddUserArgs {
  email: string;
  password: string;
}

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
    allUsers: () => userRepository.getAll(),
  },
  Mutation: {
    addUser: async (_root: any, args: AddUserArgs) => {
      try {
        const user = new User(toNewUser(args));
        const addedUser = await userRepository.create(user);
        return addedUser;
      } catch (error) {
        throw new UserInputError((error as Error).message, {
          invalidArgs: args,
        });
      }
    },
  },
};
