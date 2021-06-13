/* eslint-disable arrow-body-style */
import surveyRepository from '../repository/surveyRepository';

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
`;

export const resolvers = {
  Query: {
    allSurveys: () => surveyRepository.getAll(),
  },
};
