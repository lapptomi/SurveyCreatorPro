/* eslint-disable arrow-body-style */
import { UserInputError } from 'apollo-server-express';
import {
  ApolloContext, ISurvey, NewSurvey, Response,
} from '../types';
import Survey, { ISurveySchema } from '../models/Survey';
import { parseQuestions, toNewSurvey } from '../utils';

export const typeDef = `
  type Survey {
    id: ID!
    creatorId: ID!
    title: String!
    description: String!
    questions: [Question!]!
    private: Boolean!
    responses: [Response!]
  }

  input QuestionInput {
    questionNumber: Int!
    question: String!
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
    allSurveys: [Survey!]!
    findSurvey(surveyId: ID!): Survey
  }

  extend type Mutation {
    addSurvey (
      title: String!
      description: String!
      questions: [QuestionInput!]!
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
    allSurveys: async (): Promise<Array<ISurvey>> => {
      return await Survey.find({}) as Array<ISurvey>;
    },
    findSurvey: async (_root: unknown, args: { surveyId: string }): Promise<ISurvey> => {
      return await Survey.findById(args.surveyId) as ISurvey;
    },
  },
  Mutation: {
    addSurvey: async (
      _root: unknown,
      args: NewSurvey,
      context: ApolloContext,
    ): Promise<ISurvey> => {
      try {
        console.log(context);
        const newSurvey = toNewSurvey({
          creatorId: context.currentUser.id,
          title: args.title,
          description: args.description,
          questions: args.questions,
          private: args.private,
        });

        const addedSurvey = await Survey.create(new Survey(newSurvey)) as ISurvey;
        console.log(addedSurvey);
        return addedSurvey;
      } catch (error) {
        console.log('Error creating survey:', (error as Error).message);
        throw new UserInputError((error as Error).message, { invalidArgs: args });
      }
    },
    addResponse: async (
      _root: unknown,
      args: Response,
      context: ApolloContext,
    ): Promise<ISurvey> => {
      try {
        if (!args.surveyId || !args.answers) {
          throw new Error('Error adding response to survey');
        }
        if (!context.currentUser.id) {
          throw new Error('User not authenticated');
        }
        parseQuestions(args.answers);

        console.log(context.currentUser.id);
        console.log(args);

        const survey = await Survey.findById(args.surveyId) as ISurveySchema;

        const response = {
          respondent: context.currentUser.id,
          answers: args.answers,
        };
        // survey.responses = survey.responses?.concat(response);
        survey.responses?.push(response);
        await survey.save();

        return survey as ISurvey;
      } catch (error) {
        console.log('Error creating survey:', (error as Error).message);
        throw new UserInputError((error as Error).message, { invalidArgs: args });
      }
    },
  },
};
