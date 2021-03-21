import express from 'express';
import cors from 'cors';
import userRouter from './src/routes/users';

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static(`${__dirname}/build`));

app.use('/api/users', userRouter);

export = app;
