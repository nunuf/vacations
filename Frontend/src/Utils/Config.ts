class Config {
  private baseUrl = process.env.REACT_APP_BACKEND_BASE_URL || 'http://localhost:3001/api/'; // 'http://143.198.8.56:3001/api/';
  public vacationsUrl = this.baseUrl + 'vacations/';
  public vacationsByUserUrl = this.baseUrl + 'vacations-by-user/';
  public vacationImagesUrl = this.baseUrl + 'vacations/images/';
  public registerUrl = this.baseUrl + 'auth/register/';
  public loginUrl = this.baseUrl + 'auth/login/';
  public followersUrl = this.baseUrl + 'followers/';
}

const appConfig = new Config(); // Singleton

export default appConfig;