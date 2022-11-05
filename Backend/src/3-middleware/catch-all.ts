import { NextFunction, Request, Response } from 'express';
import logger from '../2-utils/logger';

const catchAll = (err: any, request: Request, response: Response, next: NextFunction) => {
  console.error(err);
  logger('error', err.message);
  response.status(err.status).send(err.message);
};

export default catchAll;