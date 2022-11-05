import { v4 as uuid } from 'uuid';
import cyber from '../2-utils/cyber';
import dal from '../2-utils/dal';
import CredentialsModel from '../4-models/credentials-model';
import { UnauthorizedErrorModel, ValidationErrorModel } from '../4-models/error-models';
import RoleModel from '../4-models/role-model';
import UserModel from '../4-models/user-model';

const register = async (user: UserModel): Promise<string> => {
  // Validation
  const err = user.validate();
  if (err) throw new ValidationErrorModel(err);

  // need to delete this after learning DB <<-------------<<--------<<----------
  const users = await dal.getAllUsers();

  // If username is taken
  if (users.some(u => u.username === user.username)) {
    throw new ValidationErrorModel('Username already taken');
  }

  // Set id
  user.id = uuid();

  // Define new user as a User role
  user.role = RoleModel.User;

  // Add new user to collection
  users.push(user);

  // Save user back to file
  await dal.saveAllUsers(users);

  // Generate token
  delete user.password;
  const token = cyber.getNewToken(user);

  return token;
};

const logIn = async (credentials: CredentialsModel): Promise<string> => {
  // Validation
  const err = credentials.validate();
  if (err) throw new ValidationErrorModel(err);

  // --------->>---->> Need to delete this after learning DB <<-------------<<--------<<----------
  const users = await dal.getAllUsers();

  // Get user by credentials
  const user = users.find(u => u.username === credentials.username && u.password === credentials.password);

  // If user not exists
  if (!user) throw new UnauthorizedErrorModel('Incorrect username or password');

  // Generate token
  const token = cyber.getNewToken(user);

  return token;
};

export default {
  register, 
  logIn
}