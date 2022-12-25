import fs from 'fs';
import { OkPacket } from 'mysql';
import path from 'path';
import { v4 as uuid } from 'uuid';
import dal from '../2-utils/dal';
import { ResourceNotFoundError, ValidationError } from '../4-models/error-models';
import VacationModel from '../4-models/vacation-model';

// Images path
const imagesPath = path.join(__dirname, '..', '1-assets', 'images');

// Get all vacations
const getAllVacations = async (userId: string): Promise<VacationModel[]> => {

  let vacations: VacationModel[] = [];

  if (userId) {
    // Query
    const sql = `
      SELECT DISTINCT
        v.vacationId AS id,
        v.destination,
        v.description,
        v.startDate,
        v.endDate,
        v.price,
        v.imageName,
        EXISTS(SELECT * FROM followers WHERE vacationId = f.vacationId AND userId = ?) AS isFollowing,
        COUNT(f.userId) AS followersCount
      FROM vacations AS v LEFT JOIN followers AS f
      ON v.vacationId = f.vacationId
      GROUP BY v.vacationId
      ORDER BY startDate DESC
    `;

    // Execute
    vacations = await dal.execute(sql, [userId]);
  }

  // Return
  return vacations;

};

// Get all vacations by user
const getUserVacations = async (userId: string): Promise<VacationModel[]> => {

  let vacations: VacationModel[] = [];

  if (userId) {
    // Query
    const sql = `
      SELECT DISTINCT
        v.vacationId AS id,
        v.destination,
        v.description,
        v.startDate,
        v.endDate,
        v.price,
        v.imageName,
        EXISTS(SELECT * FROM followers WHERE vacationId = f.vacationId AND userId = ?) AS isFollowing,
        COUNT(f.userId) AS followersCount
      FROM vacations AS v LEFT JOIN followers AS f
      ON v.vacationId = f.vacationId
      WHERE f.userId = ?
      GROUP BY v.vacationId
      ORDER BY startDate DESC
    `;

    // Execute
    vacations = await dal.execute(sql, [userId, userId]);
  }

  // Return
  return vacations;

};

// Get one vacation
const getOneVacation = async (id: string, userId: string): Promise<VacationModel> => {

  let vacation: VacationModel = null;

  if (userId) {
    // Query
    const sql = `
        SELECT DISTINCT
        v.vacationId AS id,
        v.destination,
        v.description,
        v.startDate,
        v.endDate,
        v.price,
        v.imageName,
        EXISTS(SELECT * FROM followers WHERE vacationId = f.vacationId AND userId = ?) AS isFollowing,
        COUNT(f.userId) AS followersCount
      FROM vacations AS v LEFT JOIN followers AS f
      ON v.vacationId = f.vacationId
      WHERE v.vacationId = ?
      GROUP BY v.vacationId
      ORDER BY startDate DESC
    `;

    // Execute
    const vacations: VacationModel[] = await dal.execute(sql, [userId, id]);

    // Extract first (and only) vacation
    vacation = vacations[0];

    // If not exist
    if (!vacation) { throw new ResourceNotFoundError(id); }
  }

  // Return
  return vacation;

};

// Add new vacation
const addVacation = async (vacation: VacationModel): Promise<VacationModel> => {

  // Validation
  const errors = vacation.validate();
  if (errors) { throw new ValidationError(errors); }
  if (await isVacationAlreadyExists(vacation)) { throw new ValidationError(`Vacation to '${vacation.destination}' already exists in this dates`); }

  // Save image to disk
  saveImage(vacation);
  // Don't save image in the database
  delete vacation.image;

  // Set id
  vacation.id = uuid();

  // Query
  const sql = `
    INSERT INTO vacations
    VALUES(?, ?, ?, ?, ?, ?, ?)
  `;

  // Execute
  await dal.execute(sql, [
    vacation.id,
    vacation.destination,
    vacation.description,
    vacation.startDate,
    vacation.endDate,
    vacation.price,
    vacation.imageName
  ]);

  // Return added vacation
  return vacation;
};

// Update existing vacation
const updateVacation = async (vacation: VacationModel): Promise<VacationModel> => {

  // Validation
  const errors = vacation.validate();
  if (errors) throw new ValidationError(errors);
  if (await isDuplicatedVacation(vacation)) {
    if (!vacation.image) {
      throw new ValidationError(`Vacation to '${vacation.destination}' already exists`);
    }
  }
  
  // Save image to disk if new image was uploaded
  if (vacation.image) {
    // Delete current image
    deleteImage(vacation);
    // Save new image to disk
    saveImage(vacation);
    // Don't save new image in the database
    delete vacation.image;
  }

  // Query
  const sql = `
    UPDATE vacations SET
      destination = ?,
      description = ?, 
      startDate = ?,
      endDate = ?,
      price = ?,
      imageName = ?
    WHERE vacationId = ?
  `;

  // Execute
  const info: OkPacket = await dal.execute(sql, [
    vacation.destination,
    vacation.description,
    vacation.startDate,
    vacation.endDate,
    vacation.price,
    vacation.imageName,
    vacation.id
  ]);

  // If not exist
  if (info.affectedRows === 0) { throw new ResourceNotFoundError(vacation.id); }

  // Return updated vacation
  return vacation;

};

// Delete one vacation
const deleteVacation = async (id: string): Promise<void> => {

  // Query SELECT vacation to delete
  const selectSql = `
    SELECT *
    FROM vacations
    WHERE vacationId = ?
  `;

  // Execute
  const vacations = await dal.execute(selectSql, [id]);

  // Extract first (and only) vacation
  const vacation: VacationModel = vacations[0];

  // If not exist
  if (!vacation) { throw new ResourceNotFoundError(id); }

  // Delete image from disk
  
  deleteImage(vacation);

  // Query DELETE vacation
  const deleteSql = `
    DELETE FROM vacations
    WHERE vacationId = ?
  `;

  // Execute
  await dal.execute(deleteSql, [id]);

};

const isVacationAlreadyExists = async (vacation: VacationModel): Promise<boolean> => {
  // Query
  const sql = `
    SELECT COUNT(*) AS count
    FROM vacations
    WHERE destination = ? AND startDate = ? AND endDate = ?
  `;

  // Execute
  const result = await dal.execute(sql, [vacation.destination, vacation.startDate, vacation.endDate]);
  
  // Check if already exists
  return result[0].count > 0;
};

const isDuplicatedVacation = async (vacation: VacationModel): Promise<boolean> => {
  // Query
  const sql = `
    SELECT COUNT(*) AS count
    FROM vacations
    WHERE destination = ? AND description = ? AND startDate = ? AND endDate = ? AND price = ?
  `;

  // Execute
  const result = await dal.execute(sql, [vacation.destination, vacation.description, vacation.startDate, vacation.endDate, vacation.price]);
  
  // Check if already exists
  return result[0].count > 0;
};

const deleteImage = (vacation: VacationModel): void => {
  const image = path.join(imagesPath, vacation.imageName);
  if (fs.existsSync(image)) {
    fs.unlinkSync(image);
  }
};

const saveImage = async (vacation: VacationModel): Promise<void> => {
  const extension = vacation.image.name.substring(vacation.image.name.lastIndexOf('.'));
  vacation.imageName = uuid() + extension;
  const image = path.join(imagesPath, vacation.imageName);
  await vacation.image.mv(image);
};

export default {
  getAllVacations,
  getUserVacations,
  getOneVacation,
  addVacation,
  updateVacation,
  deleteVacation
}