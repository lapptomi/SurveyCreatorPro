/* eslint-disable arrow-body-style */
import { UserInputError } from 'apollo-server-express';
import { ISurvey, NewSurvey } from '../../types';
import Survey from '../models/survey';
import { toNewSurvey } from '../utils';

export const typeDef = `
  type Survey {
    id: ID!
    title: String!
    description: String!
    questions: [Question!]!
    private: Boolean
  }

  type Question {
    question: String!
    answerOptions: [String!]!
  }

  input QuestionInput {
    question: String!
    answerOptions: [String!]!
  }

  extend type Query {
    allSurveys: [Survey!]!
  }

  extend type Mutation {
    addSurvey (
      title: String!
      description: String!
      questions: [QuestionInput!]!
      private: Boolean
    ): Survey
  }
`;

export const resolvers = {
  Query: {
    allSurveys: async (): Promise<Array<ISurvey>> => {
      return await Survey.find({}) as Array<ISurvey>;
    },
  },
  Mutation: {
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    addSurvey: async (_root: any, args: NewSurvey): Promise<ISurvey> => {
      try {
        const newSurvey = toNewSurvey(args);
        const addedSurvey = await Survey.create(new Survey(newSurvey)) as ISurvey;

        return addedSurvey;
      } catch (error) {
        throw new UserInputError((error as Error).message, {
          invalidArgs: args,
        });
      }
    },
  },
};
