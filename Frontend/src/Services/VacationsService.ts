import axios from 'axios';
import VacationModel from '../Models/VacationModel';
import { VacationsActionType, vacationsStore } from '../Redux/VacationsState';
import appConfig from '../Utils/Config';
import Utils from '../Utils/Utils';

class VacationsService {

  // Get all vacations
  public async getAllVacations(): Promise<VacationModel[]> {

    // Take vacations from global store
    let vacations = vacationsStore.getState().vacations;

    // If we don't have this vacations in global state
    if (vacations.length === 0) {

      // AJAX Request
      const response = await axios.get<VacationModel[]>(appConfig.vacationsUrl);

      // Extract vacations
      vacations = response.data;

      // Save vacations to global state
      vacationsStore.dispatch({ type: VacationsActionType.FetchVacations, payload: vacations });

    }

    // Return vacations
    return vacations;

  }

  // Get all vacations by user
  public async getUserVacations(): Promise<VacationModel[]> {

    // Take vacations from global store
    let vacations = vacationsStore.getState().vacations;

    // Find user's vacations
    let userVacations = vacations.filter(v => v.isFollowing === 1);

    // If we don't have this vacations in global state
    if (userVacations.length === 0) {

      // AJAX Request
      const response = await axios.get<VacationModel[]>(appConfig.vacationsByUserUrl);

      // Extract vacations
      userVacations = response.data;

    }
    
    // Return vacations
    return userVacations;

  }
  
  // Get one vacation
  public async getOneVacation(id: string): Promise<VacationModel> {

    // Take vacations from global store
    let vacations = vacationsStore.getState().vacations;

    // Find required vacation
    let vacation = vacations.find(v => v.id === id);

    // If we don't have that vacation in global state
    if (!vacation) {

      // AJAX Request
      const response = await axios.get<VacationModel>(appConfig.vacationsUrl + id);

      // Extract vacation
      vacation = response.data;

    }

    // Return vacation
    return vacation;

  }

  // Add vacation
  public async addVacation(vacation: VacationModel): Promise<void> {

    // AJAX Request - Sending a new vacation to add, receiving back the added vacation - after adding to the database

    const myFormData = this.setMyFormData(vacation);

    // Sending object with file (the image)
    const response = await axios.post<VacationModel>(appConfig.vacationsUrl, myFormData);

    // Extract the added vacation
    const addedVacation = response.data;

    // Add the added vacation to the global state
    vacationsStore.dispatch({ type: VacationsActionType.AddVacation, payload: addedVacation });

  }

  // Update vacation
  public async updateVacation(vacation: VacationModel): Promise<void> {

    // AJAX Request - Sending an existing vacation to update, receiving back the updated vacation - after updating it in the database

    const myFormData = this.setMyFormData(vacation);

    // Sending object with file (the image)
    const response = await axios.put<VacationModel>(appConfig.vacationsUrl + vacation.id, myFormData);

    // Extract the updated vacation
    const updatedVacation = response.data;

    // Update that vacation in the global store
    vacationsStore.dispatch({ type: VacationsActionType.UpdateVacation, payload: updatedVacation });

  }

  // Delete vacation
  public async deleteVacation(id: string): Promise<void> {

    // Delete in backend
    await axios.delete<void>(appConfig.vacationsUrl + id);

    // Delete in global state
    vacationsStore.dispatch({ type: VacationsActionType.DeleteVacation, payload: id });

  }

  private setMyFormData(vacation: VacationModel) {

    const myFormData = new FormData(); // Can contain strings and/or files
    myFormData.append("destination", vacation.destination);
    myFormData.append("description", vacation.description);
    myFormData.append('startDate', Utils.format(Utils.getDate(vacation.startDate)));
    myFormData.append('endDate', Utils.format(Utils.getDate(vacation.endDate)));
    myFormData.append("price", vacation.price.toString());
    const image = vacation.image[0]; // image = FileList, image[0] = File
    myFormData.append("image", image);
    myFormData.append("imageName", vacation.imageName);
    return myFormData;

  }

}

const vacationsService = new VacationsService();

export default vacationsService;
