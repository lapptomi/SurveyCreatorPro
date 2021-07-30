/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable arrow-body-style */
import { UserInputError } from 'apollo-server-express';
import {
  ApolloContext, ISurvey, NewSurvey, IResponse,
} from '../types';
import Survey from '../models/Survey';
import { parseAnswers, toNewSurvey } from '../utils';

export const typeDef = `
  type Survey {
    id: ID!
    creatorId: ID!
    title: String!
    description: String!
    questions: [Question!]!
    private: Boolean!
    responses: [Response!]!
  }

  type Question {
    questionNumber: Int!
    question: String!
  }

  type Response {
    respondent: ID!
    answers: [Answer!]!
  }

  type Answer {
    questionNumber: Int!
    question: String!
    answer: Int!
  }

  input AnswerInput {
    questionNumber: Int!
    question: String!
    answer: Int!
  }


  extend type Query {
    allSurveys(private: Boolean, ofCurrentUser: Boolean): [Survey!]!
    findSurvey(surveyId: ID!): Survey
  }

  extend type Mutation {
    addSurvey (
      title: String!
      description: String!
      questions: [String!]!
      private: Boolean!
    ): Survey

    addResponse (
      surveyId: ID!
      answers: [AnswerInput!]!
    ): Survey
  }
`;

export const resolvers = {
  Query: {
    allSurveys: async (
      _root: unknown,
      args: { private: boolean, ofCurrentUser: boolean },
      context: ApolloContext,
    ): Promise<Array<ISurvey>> => {
      // return surveys that are set to private
      if (args.private) {
        return Survey.find({ private: true });
      }
      // return surveys of the current user
      if (args.ofCurrentUser) {
        return Survey.find({ creatorId: context.currentUser.id });
      }
      return Survey.find({ private: false });
    },
    findSurvey: async (_root: unknown, args: { surveyId: string }): Promise<ISurvey | null> => {
      return Survey.findById(args.surveyId);
    },
  },
  Mutation: {
    addSurvey: async (
      _root: unknown,
      args: NewSurvey,
      context: ApolloContext,
    ): Promise<ISurvey> => {
      try {
        const newSurvey = toNewSurvey({
          creatorId: context.currentUser.id,
          title: args.title,
          description: args.description,
          questions: args.questions,
          private: args.private,
          responses: [],
        });

        const addedSurvey = await Survey.create(new Survey(newSurvey));
        return addedSurvey;
      } catch (error) {
        console.log('Error creating survey:', (error as Error).message);
        throw new UserInputError((error as Error).message, { invalidArgs: args });
      }
    },
    addResponse: async (
      _root: unknown,
      args: IResponse,
      context: ApolloContext,
    ): Promise<ISurvey> => {
      try {
        if (!context.currentUser.id) {
          throw new Error('User not authenticated');
        }

        const survey = await Survey.findById(args.surveyId);
        if (!survey) {
          throw new Error('Survey not found');
        }

        const userHasRespondedAlready = survey.responses?.some(({ respondent }) => {
          return respondent.toString() === context.currentUser.id;
        });

        if (userHasRespondedAlready) {
          throw new Error('You have already answered this survey');
        }

        const response: IResponse = {
          respondent: context.currentUser.id,
          answers: parseAnswers(args.answers),
        };

        survey.responses?.push(response);
        await survey.save();

        return survey;
      } catch (error) {
        console.log('Error creating survey:', (error as Error).message);
        throw new UserInputError((error as Error).message, { invalidArgs: args });
      }
    },
  },
};
