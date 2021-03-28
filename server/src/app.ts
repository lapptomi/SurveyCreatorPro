/* eslint-disable no-underscore-dangle */
import express, { Request, Response } from 'express';
import cors from 'cors';
import userRouter from './routes/users';
import loginRouter from './routes/login';
import surveyRouter from './routes/surveys';
import middleware from './middleware';

const app = express();

app.use(express.json());
app.use(cors());
app.use(express.static(`${__dirname}/../build`));

app.use(middleware.reqestPrinter);
app.use(middleware.tokenExtractor);

app.use('/api/users', userRouter);
app.use('/api/login', loginRouter);
app.use('/api/surveys', surveyRouter);

//  As default GET-requests returns React index.html
// (React router didn't work without this)
app.use((_req: Request, res: Response) => {
  res.sendFile('index.html', { root: './dist/build/' });
});

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

export = app;
