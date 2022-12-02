class Config {
  public vacationsUrl = 'http://localhost:3001/api/vacations/';
  public vacationsByUserUrl = 'http://localhost:3001/api/vacations-by-user/';
  public vacationImagesUrl = 'http://localhost:3001/api/vacations/images/';
  public registerUrl = 'http://localhost:3001/api/auth/register/';
  public loginUrl = 'http://localhost:3001/api/auth/login/';
  public followersUrl = 'http://localhost:3001/api/followers/';
}

const appConfig = new Config(); // Singleton

export default appConfig;