import express, { Request, Response } from 'express';
import cors from 'cors';
import userRouter from './routes/users';
import loginRouter from './routes/login';

const app = express();

app.use(express.json());
app.use(cors());
app.use(express.static(`${__dirname}/../build`));

app.use('/api/users', userRouter);
app.use('/api/login/', loginRouter);

/*
  As default GET-requests returns React index.html
  (needed for react router)
*/
app.get('*', (_req: Request, res: Response) => {
  res.sendFile('index.html', { root: './dist/build/' });
});

export = app;
