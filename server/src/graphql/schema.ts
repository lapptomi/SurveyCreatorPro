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
import {
  typeDef as LoginDef,
  resolvers as LoginResolvers,
} from './login';

// If you had Query / Mutation / Subscription fields not associated with a
// specific type you could put them here
const Query = `
  type Query {
    _empty: String
  }

  type Mutation {
    _empty: String
  }

  type Subscription {
    _empty: String
  }
`;

const resolvers = {};

export const schema = makeExecutableSchema({
  typeDefs: [Query, UserDef, SurveyDef, LoginDef],
  resolvers: merge(resolvers, userResolvers, surveyResolvers, LoginResolvers),
});
