import crypto from 'crypto';
import { Request } from 'express';
import jwt from 'jsonwebtoken';
import RoleModel from '../4-models/role-model';
import UserModel from '../4-models/user-model';

const jwtSecretKey = 'HarryPotter';
const salt = 'ExpectoPatronum';

const getNewToken = (user: UserModel): string => {

  // Never return passwords to frontend!
  delete user.password;

  // Create a container for the user object
  const container = { user };

  // Create expiration time
  const options = { expiresIn: '3h' };

  // Generate token
  const token = jwt.sign(container, jwtSecretKey, options);

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
      jwt.verify(token, jwtSecretKey, err => {
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

const verifyUser = async (request: Request): Promise<string> => {

  // First check if user logged in
  const isLoggedIn = await verifyToken(request);
  // If not logged in
  if (!isLoggedIn) return null;

  // Extract token
  const header = request.header('authorization');
  const token = header.substring(7);

  // Extract container from token
  const container: any = jwt.decode(token);

  // Extract user
  const user: UserModel = container.user;

  // Return user
  return user.id;
  
};

const hash = (plainText: string): string => {

  if (!plainText) return null;

  // Hash with salt
  const hashedText = crypto.createHmac('sha512', salt).update(plainText).digest('hex');

  return hashedText;

  // SHA - Secure Hashing Algorithm
  // HMAC - Hash based Message Authentication Code

};

export default {
  getNewToken,
  verifyToken,
  verifyAdmin,
  verifyUser,
  hash
};