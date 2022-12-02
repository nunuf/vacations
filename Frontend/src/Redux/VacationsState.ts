// Global State for all Vacations

import { createStore } from 'redux';
// import { composeWithDevTools } from 'redux-devtools-extension';
import VacationModel from '../Models/VacationModel';

// 1. Global State - the global data
export class VacationsState {
  public vacations: VacationModel[] = [];
}

// 2. Action Type - a list of operations we can perform on the data
export enum VacationsActionType {
  FetchVacations = "FetchVacations",
  AddVacation = "AddVacation",
  UpdateVacation = "UpdateVacation",
  DeleteVacation = "DeleteVacation",
  AddFollower = "AddFollower",
  DeleteFollower = "DeleteFollower",
  ClearVacations = "ClearVacations",
}

// 3. Action - A single object which dispatch sends to Redux for some change
export interface VacationsAction {
  type: VacationsActionType;
  payload?: any;  // optional because logout (ClearVacations) needs no payload
}

// 4. Reducer - a function which will be invoked when calling dispatch to perform the operation
export function vacationsReducer(currentState = new VacationsState(), action: VacationsAction): VacationsState {

  const newState = { ...currentState };

  switch (action.type) {

    case VacationsActionType.FetchVacations: // Here the payload is a list of vacations (VacationModel[])
      newState.vacations = action.payload;
      break;

    case VacationsActionType.AddVacation: // Here the payload is a vacation to add (VacationModel)
      newState.vacations.push(action.payload);
      break;

    case VacationsActionType.UpdateVacation: // Here the payload is a vacation to update (VacationModel)
      const indexToUpdate = newState.vacations.findIndex(v => v.id === action.payload.id);
      if (indexToUpdate >= 0) {
        newState.vacations[indexToUpdate] = action.payload;
      }
      break;

    case VacationsActionType.DeleteVacation: // Here the payload is the id of the vacation to delete (number)
      const indexToDelete = newState.vacations.findIndex(v => v.id === action.payload);
      if (indexToDelete >= 0) {
        newState.vacations.splice(indexToDelete, 1);
      }
      break;
    
    case VacationsActionType.AddFollower: // Here the payload is a follower to add (FollowerModel)
      const indexToAddFollower = newState.vacations.findIndex(v => v.id === action.payload.vacationId);
      if (indexToAddFollower >= 0) {
        newState.vacations[indexToAddFollower].isFollowing = 1;
        newState.vacations[indexToAddFollower].followersCount++;
      }
      break;
    
    case VacationsActionType.DeleteFollower: // Here the payload is vacationId of the vacation to update (number)
      const indexToDeleteFollower = newState.vacations.findIndex(v => v.id === action.payload);
      if (indexToDeleteFollower >= 0) {
        newState.vacations[indexToDeleteFollower].isFollowing = 0;
        newState.vacations[indexToDeleteFollower].followersCount--;
      }
      break;

    case VacationsActionType.ClearVacations:
      newState.vacations = [];
      break;
  }

  return newState;
}

// 5. Store - manager object from Redux library which handles the entire operation
// export const vacationsStore = createStore(vacationsReducer, composeWithDevTools()); // Development
export const vacationsStore = createStore(vacationsReducer); // Production
