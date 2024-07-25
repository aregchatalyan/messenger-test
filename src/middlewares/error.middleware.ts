import { NextFunction, Request, Response } from 'express';
import { ApiError } from '../utils/api.error';

export const errorMiddleware = (err: Error | ApiError, _req: Request, res: Response, _next: NextFunction) => {
  if (err && err instanceof ApiError)
    return res.status(err.status).json({
      message: err.message,
      errors: err.errors
    });

  console.log(err.message);
  res.status(500).send('Oops! Something went wrong!');
}
