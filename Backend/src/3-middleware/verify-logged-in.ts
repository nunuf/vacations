import { NextFunction, Request, Response } from 'express';
import cyber from '../2-utils/cyber';
import { UnauthorizedError } from '../4-models/error-models';

const verifyLoggedIn = async (request: Request, response: Response, next: NextFunction) => {

  try {

    const isValid = await cyber.verifyToken(request);
    if (!isValid) throw new UnauthorizedError('Invalid token');
    next();

  } catch (err: any) {
    next(err);
  }
  
}

export default verifyLoggedIn;