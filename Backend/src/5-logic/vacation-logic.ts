import fs from 'fs';
import { v4 as uuid } from 'uuid';
import dal from '../2-utils/dal';
import { ResourceNotFoundErrorModel, ValidationErrorModel } from '../4-models/error-models';
import VacationModel from '../4-models/vacation-model';

// Get all vacations
const getAllVacations = async (): Promise<VacationModel[]> => {
  // Get all vacations from JSON file
  const vacations = await dal.getAllVacations();
  // Return all vacations
  return vacations;
};

// Get one vacation
const getOneVacation = async (id: string): Promise<VacationModel> => {
  // Get all vacations from JSON file
  const vacations = await dal.getAllVacations();
  // Find desired vacation
  const vacation = vacations.find(c => c.id === id);
  if (!vacation) throw new ResourceNotFoundErrorModel(id);
  return vacation;
};

// Add new vacation
const addVacation = async (vacation: VacationModel): Promise<VacationModel> => {
  // Validation
  const errors = vacation.validate();
  if (errors) throw new ValidationErrorModel(errors);

  // Save image to disk if exists
  if (vacation.image) {
    const extension = vacation.image.name.substring(vacation.image.name.lastIndexOf('.'));
    vacation.imageName = uuid() + extension;
    await vacation.image.mv('./src/1-assets/images/' + vacation.imageName);
    delete vacation.image;
  }

  const vacations = await dal.getAllVacations();
  // Generate new id
  vacation.id = uuid();
  // Add vacation to array
  vacations.push(vacation);
  // Save back all vacation to JSON file
  await dal.saveAllVacations(vacations);
  // Return added vacation
  return vacation;
};

// Update existing vacation
const updateVacation = async (vacation: VacationModel): Promise<VacationModel> => {
  // Validation
  const errors = vacation.validate();
  if (errors) throw new ValidationErrorModel(errors);

  const vacations = await dal.getAllVacations();
  const index = vacations.findIndex(c => c.id === vacation.id);
  if (index === -1) throw new ResourceNotFoundErrorModel(vacation.id);
  // Save image to disk if exists
  if (vacation.image) {
    // If we have a previous image
    if (fs.existsSync('./src/1-assets/images/' + vacations[index].imageName)) {
      // Delete it
      fs.unlinkSync('./src/1-assets/images/' + vacations[index].imageName);
    }
    const extension = vacation.image.name.substring(vacation.image.name.lastIndexOf('.'));
    vacation.imageName = uuid() + extension;
    await vacation.image.mv('./src/1-assets/images/' + vacation.imageName);
    delete vacation.image;
  }
  // Update found vacation
  vacations[index] = vacation;
  // Save back all vacations to JSON file
  await dal.saveAllVacations(vacations);
  return vacation;
};

// Delete one vacation
const deleteVacation = async (id: string): Promise<void> => {
  const vacations = await dal.getAllVacations();
  const index = vacations.findIndex(c => c.id === id);
  if (index === -1) throw new ResourceNotFoundErrorModel(id);
  // If we have a previous image
  if (fs.existsSync('./src/1-assets/images/' + vacations[index].imageName)) {
    // Delete it
    fs.unlinkSync('./src/1-assets/images/' + vacations[index].imageName);
  }
  // Delete desired vacation from array
  vacations.splice(index, 1);
  await dal.saveAllVacations(vacations);
};

export default {
  getAllVacations,
  getOneVacation,
  addVacation,
  updateVacation,
  deleteVacation
}