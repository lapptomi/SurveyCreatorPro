/* eslint-disable arrow-body-style */
import { UserInputError } from 'apollo-server-express';
import { NewSurvey } from '../../types';
import surveyRepository from '../repository/surveyRepository';
import { toNewSurvey } from '../utils';

export const typeDef = `
  type Survey {
    id: ID!
    email: String!
    username: String!
    password: String!
  }

  extend type Query {
    allSurveys: [Survey!]!
  }

  extend type Mutation {
    addSurvey (
      title: String!
      description: String!
      questions: [String]
      private: Boolean
    ): Survey
  }
`;

export const resolvers = {
  Query: {
    allSurveys: () => surveyRepository.getAll(),
  },
  Mutation: {
    addSurvey: async (_root: any, args: NewSurvey) => {
      try {
        const surveyToAdd = toNewSurvey(args);
        const addedSurvey = await surveyRepository.create(surveyToAdd);

        return addedSurvey;
      } catch (error) {
        throw new UserInputError((error as Error).message, {
          invalidArgs: args,
        });
      }
    },
  },
};
