import fs from 'fs';
import { v4 as uuid } from 'uuid';
import VacationModel from '../4-models/vacation-model';

const saveImage = async (vacation: VacationModel): Promise<void> => {
  const extension = vacation.image.name.substring(vacation.image.name.lastIndexOf('.'));
  vacation.imageName = uuid() + extension;
  await vacation.image.mv('./src/1-assets/images/' + vacation.imageName);
};

const deleteImage = (vacation: VacationModel): void => {
  // If we have a previous image
  if (fs.existsSync('./src/1-assets/images/' + vacation.imageName)) {
    // Delete it
    fs.unlinkSync('./src/1-assets/images/' + vacation.imageName);
  }
};

export default {
  saveImage,
  deleteImage
}