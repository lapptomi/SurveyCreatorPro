import { makeExecutableSchema } from 'apollo-server-express';
import { merge } from 'lodash';
import {
  typeDef as UserDef,
  resolvers as userResolvers,
} from './user';
import {
  typeDef as SurveyDef,
  resolvers as surveyResolvers,
} from './survey';

// If you had Query fields not associated with a
// specific type you could put them here
const Query = `
  type Query {
    _empty: String
  }
`;

const resolvers = {};

export const schema = makeExecutableSchema({
  typeDefs: [Query, UserDef, SurveyDef],
  resolvers: merge(resolvers, userResolvers, surveyResolvers),
});
