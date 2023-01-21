// General config
class AppConfig {
}

// Development config
class DevelopmentConfig extends AppConfig {
  public isDevelopment = true;
  public isProduction = false;
  public host = process.env.MYSQL_HOST || 'localhost';
  public database = process.env.MYSQL_DATABASE || 'magic_trip';
  public user = process.env.MYSQL_USER || 'root';
  public password = process.env.MYSQL_PASSWORD || '';
  public port = process.env.PORT || 3001;
  public frontEndUrl = 'http://localhost:3000';
}

// Production config
class ProductionConfig extends AppConfig {
  public isDevelopment = false;
  public isProduction = true;
  public host = process.env.MYSQL_HOST;
  public database = process.env.MYSQL_DATABASE;
  public user = process.env.MYSQL_USER;
  public password = process.env.MYSQL_PASSWORD;
  public port = process.env.PORT;
  public frontEndUrl = process.env.FRONTEND_BASE_URL; // 'http://143.198.8.56';
}

const appConfig = (process.env.NODE_ENV === 'production') ? new ProductionConfig() : new DevelopmentConfig();

export default appConfig;
