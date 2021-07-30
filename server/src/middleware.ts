import { NextFunction, Request, Response } from 'express';

const reqestPrinter = (req: Request, _res: Response, next: NextFunction): void => {
  console.log('Method:', req.method);
  console.log('Path:  ', req.path);
  console.log('---');
  next();
};

const errorHandler = (
  error: Error,
  _request: Request,
  response: Response,
  next: NextFunction,
): void => {
  switch (error.name) {
    case 'CastError':
      response.status(400).send({ error: 'malformatted id' });
      break;
    case 'ValidationError':
      response.status(400).json({ error: error.message });
      break;
    case 'JsonWebTokenError':
      response.status(401).json({
        error: 'invalid token',
      });
      break;
    case 'TypeError':
      response.status(400).json({
        error: error.message,
      });
      break;
    case 'UserNotFound':
      response.status(401).json({
        error: error.message,
      });
      break;
    default:
      console.log('ERROR = ', error.message);
      next(error);
      break;
  }
};

export default {
  reqestPrinter,
  errorHandler,
};
