/* eslint-disable arrow-body-style */
import { UserInputError } from 'apollo-server-express';
import { ISurvey, NewSurvey } from '../types';
import Survey from '../models/survey';
import { toNewSurvey } from '../utils';

export const typeDef = `
  type Survey {
    id: ID!
    title: String!
    description: String!
    questions: [String!]!
    private: Boolean!
  }

  extend type Query {
    allSurveys: [Survey!]!
    findSurvey(surveyId: ID!): Survey
  }

  extend type Mutation {
    addSurvey (
      title: String!
      description: String!
      questions: [String!]!
      private: Boolean!
    ): Survey
  }
`;

export const resolvers = {
  Query: {
    allSurveys: async (): Promise<Array<ISurvey>> => {
      return await Survey.find({}) as Array<ISurvey>;
    },
    findSurvey: async (_root: unknown, args: { surveyId: string }): Promise<ISurvey> => {
      return await Survey.findById(args.surveyId) as ISurvey;
    },
  },
  Mutation: {
    addSurvey: async (_root: unknown, args: NewSurvey): Promise<ISurvey> => {
      try {
        const newSurvey = toNewSurvey(args);
        const addedSurvey = await Survey.create(new Survey(newSurvey)) as ISurvey;
        return addedSurvey;
      } catch (error) {
        console.log('Error creating survey:', (error as Error).message);
        throw new UserInputError((error as Error).message, {
          invalidArgs: args,
        });
      }
    },
  },
};
