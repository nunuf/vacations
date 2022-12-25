import RoleModel from './RoleModel';

class UserModel {
  public id: string;
  public firstName: string;
  public lastName: string;
  public username: string;
  public password: string;
  public role: RoleModel;

  public static firstNameValidation = {
    required: { value: true, message: 'Missing first name' },
    minLength: { value: 2, message: 'First name too short' },
    maxLength: { value: 50, message: 'First name too long' },
  }
  public static lastNameValidation = {
    required: { value: true, message: 'Missing last name' },
    minLength: { value: 2, message: 'Last name too short' },
    maxLength: { value: 50, message: 'Last name too long' },
  }
  public static usernameValidation = {
    required: { value: true, message: 'Missing username' },
    minLength: { value: 2, message: 'Username too short' },
    maxLength: { value: 50, message: 'Username too long' },
  }
  public static passwordValidation = {
    required: { value: true, message: 'Missing password' },
    minLength: { value: 4, message: 'Password too short' },
    maxLength: { value: 20, message: 'Password too long' },
  }
}

export default UserModel;