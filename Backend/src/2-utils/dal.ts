import mysql from 'mysql';
import appConfig from './app-config';

const connection = mysql.createPool({
  host: appConfig.host,
  user: appConfig.user,
  password: appConfig.password,
  database: appConfig.database
});

const execute = (sql: string, values?: any[]): Promise<any> => {
  return new Promise<any>((resolve, reject) => {
    connection.query(sql, values, (error, result) => {
      if (error) {
        reject(error);
        return;
      }
      resolve(result);
    });
  });
};

export default {
  execute
};