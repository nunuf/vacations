import fsPromises from 'fs/promises';
import UserModel from '../4-models/user-model';
import VacationModel from '../4-models/vacation-model';

const vacationsFilePath = './src/1-assets/json/vacation.json';
const usersFilePath = './src/1-assets/json/user.json';

const getAllVacations = async (): Promise<VacationModel[]> => {
  const content = await fsPromises.readFile(vacationsFilePath, "utf-8");
  const vacations = JSON.parse(content);
  return vacations;
};

const saveAllVacations = async (vacations: VacationModel[]): Promise<void> => {
  const content = JSON.stringify(vacations, null, 4);
  await fsPromises.writeFile(vacationsFilePath, content);
};

const getAllUsers = async (): Promise<UserModel[]> => {
  const content = await fsPromises.readFile(usersFilePath, "utf-8");
  const vacations = JSON.parse(content);
  return vacations;
};

const saveAllUsers = async (users: UserModel[]): Promise<void> => {
  const content = JSON.stringify(users, null, 4);
  await fsPromises.writeFile(usersFilePath, content);
};

export default {
  getAllVacations,
  saveAllVacations,
  getAllUsers,
  saveAllUsers
}