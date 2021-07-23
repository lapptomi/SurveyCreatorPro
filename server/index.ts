/* eslint-disable arrow-body-style */
import { ApolloServer } from 'apollo-server-express';
import dotenv from 'dotenv';
import * as jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import { schema } from './src/graphql/schema';
import app from './src/app';
import { ApolloContext, IUser } from './types';
import User from './src/models/user';

dotenv.config();

const MONGODB_URI = process.env.NODE_ENV !== 'production'
  ? process.env.TEST_MONGODB_URI
  : process.env.MONGODB_URI;

mongoose.connect(MONGODB_URI as string, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
}).then(() => {
  console.log('connected to MongoDB');
}).catch((error) => {
  console.log('error connecting to MongoDB:', (error as Error).message);
  process.exit();
});

const startApolloServer = async () => {
  const server = new ApolloServer({
    schema,
    // eslint-disable-next-line consistent-return
    context: async ({ req }): Promise<ApolloContext | null> => {
      const authorization = req
        ? req.headers.authorization
        : null;

      if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
        const auth: Array<string> = authorization.split(' ');
        // auth[0] should equal 'bearer'
        // and auth[1] should be the token
        const token = auth[1];

        const decodedToken = jwt.verify(
          token, process.env.SECRET as string,
        ) as IUser;

        if (!token || !decodedToken.id) {
          throw new Error('Token missing or invalid');
        }

        const user = await User.findById(decodedToken.id) as IUser;

        return { currentUser: user };
      }

      return null;
    },
  });

  await server.start();

  server.applyMiddleware({ app });

  const PORT = process.env.PORT || 4000;
  app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
  });
};

startApolloServer().catch((err) => {
  console.error(err);
});
