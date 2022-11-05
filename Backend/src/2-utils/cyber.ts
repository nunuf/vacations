import { Request } from 'express';
import jwt from 'jsonwebtoken';
import RoleModel from '../4-models/role-model';
import UserModel from '../4-models/user-model';

// Create secret key
const secretKey = 'MagicTrip';

const getNewToken = (user: UserModel): string => {
  // Create a container for the user object
  const container = { user };

  // Create expiration time
  const options = { expiresIn: '3h' };

  // Generate token
  const token = jwt.sign(container, secretKey, options);

  return token;
};

const verifyToken = (request: Request): Promise<boolean> => {
  return new Promise<boolean>((resolve, reject) => {
    try {

      // Extract header
      const header = request.header('authorization');
      // If no such header
      if (!header) {
        resolve(false);
        return;
      }

      // Extract token from header
      const token = header.substring(7);
      // If there is no token
      if (!token) {
        resolve(false);
        return;
      }

      // Verify token
      jwt.verify(token, secretKey, err => {
        // If token is illegal
        if (err) {
          resolve(false);
          return;
        }
        // Here token must be legal
        resolve(true);
      });

    } catch (err: any) {
      reject(err);
    }
  });
};

const verifyAdmin = async (request: Request): Promise<boolean> => {
  // First check if user logged in
  const isLoggedIn = await verifyToken(request);
  // If not logged in
  if (!isLoggedIn) return false;

  // Extract token
  const header = request.header('authorization');
  const token = header.substring(7);

  // Extract container from token
  const container: any = jwt.decode(token);

  // Extract user
  const user: UserModel = container.user;

  // Return true if user is admin, otherwise return false
  return user.role === RoleModel.Admin;
};

export default {
  getNewToken,
  verifyToken,
  verifyAdmin
}