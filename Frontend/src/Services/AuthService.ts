import axios from 'axios';
import CredentialsModel from '../Models/CredentialsModel';
import UserModel from '../Models/UserModel';
import { AuthActionType, authStore } from '../Redux/AuthState';
import { VacationsActionType, vacationsStore } from '../Redux/VacationsState';
import appConfig from '../Utils/Config';

class AuthService {

  // Registering a new user
  public async register(user: UserModel): Promise<void> {

    // Send to backend the new user
    const response = await axios.post<string>(appConfig.registerUrl, user);

    // Backend returns token
    const token = response.data;

    // Send token to Redux
    authStore.dispatch({ type: AuthActionType.Register, payload: token });

  }

  // Login existing user
  public async login(credentials: CredentialsModel): Promise<void> {

    // Send to backend the credentials
    const response = await axios.post<string>(appConfig.loginUrl, credentials);

    // Backend returns token
    const token = response.data;
    
    // Send token to Redux
    authStore.dispatch({ type: AuthActionType.Login, payload: token });

  }

  // Logout existing user
  public logout(): void {

    // Clear vacations from Redux
    vacationsStore.dispatch({ type: VacationsActionType.ClearVacations });

    // Clear token from Redux
    authStore.dispatch({ type: AuthActionType.Logout });

  }

}

const authService = new AuthService();

export default authService;
