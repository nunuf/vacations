import { NextFunction, Request, Response } from 'express';
import cyber from '../2-utils/cyber';
import { UnauthorizedError } from '../4-models/error-models';

const verifyAdmin = async (request: Request, response: Response, next: NextFunction) => {

  try {

    const isValid = await cyber.verifyAdmin(request);
    if (!isValid) throw new UnauthorizedError('You are not authorized');
    next();

  } catch (err: any) {
    next(err);
  }

}

export default verifyAdmin;