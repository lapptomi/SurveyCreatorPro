import express from 'express';

const app = express();

app.use(express.json());
app.use(express.static(`${__dirname}/build`));

app.get('/', (_req, res) => {
  res.status(200).end();
});

export = app;
