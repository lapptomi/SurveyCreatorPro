/* eslint-disable no-underscore-dangle */
import express, { Request, Response } from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import userRouter from './routes/users';
import loginRouter from './routes/login';
import surveyRouter from './routes/surveys';
import middleware from './middleware';
import userRepository from './repository/userRepository';
import surveyRepository from './repository/surveyRepository';
import questionRepository from './repository/questionRepository';

const app = express();

mongoose.connect(process.env.MONGODB_URI || 'asd', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
}).then(() => {
  console.log('connected to MongoDB');
}).catch((error) => {
  console.log('error connection to MongoDB:', (error as Error).message);
});

app.use(express.json());
app.use(cors());
app.use(express.static(`${__dirname}/../build`));

if (process.env.NODE_ENV === 'development') {
  app.use(middleware.reqestPrinter);
}

app.use(middleware.tokenExtractor);

app.use('/api/users', userRouter);
app.use('/api/login', loginRouter);
app.use('/api/surveys', surveyRouter);

if (process.env.NODE_ENV === 'test') {
  app.get('/api/testing/reset', async (_req: Request, res: Response) => {
    try {
      await questionRepository.deleteAll();

      await userRepository.deleteAll();
      await surveyRepository.deleteAll();
      res.status(204).end();
    } catch (e) {
      console.log(e);
      res.status(400).json((e as Error).message);
    }
  });
}

app.get('/health', (_req: Request, res: Response) => {
  res.send('ok');
});

//  As default GET-requests returns React index.html
// (React router didn't work without this)
app.get('*', (_req: Request, res: Response) => {
  res.sendFile('index.html', { root: './dist/server/build/' });
});

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

export = app;
