import { NextFunction, Request, Response } from 'express';
import logger from '../2-utils/logger';

const logRequest = (request: Request, response: Response, next: NextFunction) => {
  logger('info', `Method: ${request.method}, Route: ${request.originalUrl}, IP: ${request.hostname}`);
  next();
};

export default logRequest;