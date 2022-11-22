import { v4 as uuid } from 'uuid';
import dal from '../2-utils/dal';
import cyber from '../2-utils/cyber';
import { UnauthorizedError, ValidationError } from '../4-models/error-models';
import UserModel from '../4-models/user-model';
import CredentialsModel from '../4-models/credentials-model';
import RoleModel from '../4-models/role-model';

const register = async (user: UserModel): Promise<string> => {
  // Validation
  const error = user.validate();
  if (error) throw new ValidationError(error);
  if (await isUsernameTaken(user.username)) throw new ValidationError(`Username ${user.username} already taken`);

  // Hash password
  user.password = cyber.hash(user.password);

  // Set id
  user.id = uuid();
  // Set role
  user.role = RoleModel.User;

  // Query
  const sql = `
    INSERT INTO users
    VALUES(?, ?, ?, ?, ?, ?)
  `;

  // Execute
  await dal.execute(sql, [
    user.id,
    user.firstName,
    user.lastName,
    user.username,
    user.password,
    user.role
  ]);

  // Generate token
  const token = cyber.getNewToken(user);

  return token;
};

const login = async (credentials: CredentialsModel): Promise<string> => {
  // Validation
  const error = credentials.validate();
  if (error) throw new ValidationError(error);

  // Hash password
  credentials.password = cyber.hash(credentials.password);

  // Query
  const sql = `
    SELECT
      userId AS id,
      firstName,
      lastName,
      username,
      password,
      roleId AS role
    FROM users
    WHERE username = ? AND password = ?
  `;

  // Execute
  const users = await dal.execute(sql, [credentials.username, credentials.password]);

  // If user not exists
  if (users.length === 0) throw new UnauthorizedError('Incorrect username or password');

  // Extract first (and only) user
  const user = users[0];

  // Generate token
  const token = cyber.getNewToken(user);

  return token;
};

const isUsernameTaken = async (username: string): Promise<boolean> => {
  // Query
  const sql = `
    SELECT COUNT(*)
    FROM users
    WHERE username = ?
  `;

  // Execute
  const count = await dal.execute(sql, [username])[0];

  // Check if already exist
  return count > 0;
};

export default {
  register,
  login
}