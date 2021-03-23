import express, { Request, Response } from 'express';
import cors from 'cors';
import userRouter from './routes/users';

const app = express();

app.use(express.json());
app.use(cors());
app.use(express.static(`${__dirname}/../build`));

app.use('/api/users', userRouter);

// As default GET-requests returns React index.html
app.get('*', (_req: Request, res: Response) => {
  res.sendFile('index.html', { root: './dist/build/' });
});

export = app;
