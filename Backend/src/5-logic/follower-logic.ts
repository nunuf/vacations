import { OkPacket } from 'mysql';
import dal from '../2-utils/dal';
import { ResourceNotFoundError, ValidationError } from '../4-models/error-models';
import FollowerModel from '../4-models/follower-model';

// Add new follower
const addFollower = async (follower: FollowerModel): Promise<FollowerModel> => {

  // Validation
  const errors = follower.validate();
  if (errors) { throw new ValidationError(errors); }

  // Query
  const sql = `
    INSERT INTO followers
    VALUES(?, ?)
  `;

  // Execute
  await dal.execute(sql, [
    follower.vacationId,
    follower.userId
  ]);

  // Return added follower
  return follower;
};

// Delete one follower
const deleteFollower = async (vacationId: string, userId: string): Promise<void> => {

  // Query DELETE follower
  const deleteSql = `
    DELETE FROM followers
    WHERE vacationId = ? AND userId = ?
  `;

  // Execute
  const info: OkPacket = await dal.execute(deleteSql, [vacationId, userId]);

  // If not exist
  if (info.affectedRows === 0) { throw new ResourceNotFoundError(`${vacationId} and ${userId}`); }

};

export default {
  addFollower,
  deleteFollower
}