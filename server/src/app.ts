import express, { Request, Response } from 'express';
import cors from 'cors';
import userRouter from './routes/users';
import loginRouter from './routes/login';
import surveyRouter from './routes/surveys';

const app = express();

app.use(express.json());
app.use(cors());
app.use(express.static(`${__dirname}/../build`));

app.use('/api/users', userRouter);
app.use('/api/login', loginRouter);
app.use('/api/surveys', surveyRouter);

//  As default GET-requests returns React index.html
// (react router didn't work without this)
app.get('*', (_req: Request, res: Response) => {
  res.sendFile('index.html', { root: './dist/build/' });
});

export = app;
