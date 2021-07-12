/* eslint-disable no-underscore-dangle */
import express from 'express';
import cors from 'cors';
import middleware from './middleware';
import Survey from './models/survey';
import User from './models/user';

const app = express();

app.use(express.json());
app.use(cors());
app.use(express.static(`${__dirname}/../build`));

if (process.env.NODE_ENV === 'development') {
  app.use(middleware.reqestPrinter);
}

app.use(middleware.tokenExtractor);

app.post('/api/testing/reset', async (_req, res) => {
  try {
    // Delete objects only if NODE_ENV is in test mode
    if (process.env.NODE_ENV === 'test') {
      await User.deleteMany();
      await Survey.deleteMany();
    }

    res.status(204).end();
  } catch (e) {
    console.log(e);
    res.status(400).json((e as Error).message);
  }
});

app.get('/api/health', (_req, res) => {
  res.send('ok');
});

// As default GET-requests returns React index.html
// (React router didn't work without this)
if (process.env.NODE_ENV === 'production') {
  app.get('*', (_req, res) => {
    res.sendFile('index.html', { root: './dist/server/build/' });
  });
}

// app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

export = app;
