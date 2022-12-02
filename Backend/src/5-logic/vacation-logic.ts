import { OkPacket } from 'mysql';
import { v4 as uuid } from 'uuid';
import dal from '../2-utils/dal';
import imageHandler from '../2-utils/imageHandler';
import { ResourceNotFoundError, ValidationError } from '../4-models/error-models';
import VacationModel from '../4-models/vacation-model';

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

  // Save image to disk
  imageHandler.saveImage(vacation);
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

  // Save image to disk if new image was uploaded
  if (vacation.image) {
    // Delete current image
    imageHandler.deleteImage(vacation);
    // Save new image to disk
    imageHandler.saveImage(vacation);
    // Don't save new image in the database
    delete vacation.image;
  }

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
  imageHandler.deleteImage(vacation);

  // Query DELETE vacation
  const deleteSql = `
    DELETE FROM vacations
    WHERE vacationId = ?
  `;

  // Execute
  await dal.execute(deleteSql, [id]);

};

export default {
  getAllVacations,
  getUserVacations,
  getOneVacation,
  addVacation,
  updateVacation,
  deleteVacation
}