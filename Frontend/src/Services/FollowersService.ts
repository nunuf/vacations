import axios from 'axios';
import FollowerModel from '../Models/FollowerModel';
import appConfig from '../Utils/Config';

class FollowersService {

  // Add follower
  public async addFollower(follower: FollowerModel): Promise<void> {

    // AJAX Request - Sending a new follower to add, receiving back the added follower - after adding to the database
    const response = await axios.post<FollowerModel>(appConfig.followersUrl, follower); 
    
    // Extract the added follower
    const addedFollower = response.data;

    // Add the added follower to the global state
    // followersStore.dispatch({ type: FollowersActionType.AddFollower, payload: addedFollower });

  }

  // Delete follower
  public async deleteFollower(vacationId: string, userId: string): Promise<void> {

    // Delete in backend
    await axios.delete<void>(`${appConfig.followersUrl}${vacationId}/${userId}`);

    // Delete in global state
    // followersStore.dispatch({ type: FollowersActionType.DeleteFollower, payload: vacationId });

  }
  
}

const followersService = new FollowersService();

export default followersService;