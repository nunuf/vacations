import React, { ChangeEvent, useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Add, Favorite, FavoriteBorder, Leaderboard } from '@mui/icons-material';
import { Checkbox, FormControlLabel } from '@mui/material';
import Pagination from '@mui/material/Pagination';
import RoleModel from '../../../Models/RoleModel';
import VacationModel from '../../../Models/VacationModel';
import notifyService from '../../../Services/NotifyService';
import vacationsService from '../../../Services/VacationsService';
import useUser from '../../../Utils/useUser';
import useVerifyLoggedIn from '../../../Utils/useVerifyLoggedIn';
import Spinner from '../../SharedArea/Spinner/Spinner';
import VacationCard from '../VacationCard/VacationCard';

import './VacationList.css';

const VacationList: React.FC = (): JSX.Element => {

  const user = useUser();
  const [isAdmin, setIsAdmin] = useState(user?.role === RoleModel.Admin);
  const [vacations, setVacations] = useState<VacationModel[]>([]);
  const [isFiltered, setIsFiltered] = useState(false);
  // const [currentPage, setCurrentPage] = useState(1);
  // const [vacationPerPage, setVacationPerPage] = useState(3);
  // const [currentVacation, setCurrentVacation] = useState();

  useEffect(() => {
    return setIsAdmin(user?.role === RoleModel.Admin);
  }, [user]);

  useVerifyLoggedIn();

  useEffect(() => {
    getAllVacations();
  }, []);
  
  const getAllVacations = (): void => {
    vacationsService.getAllVacations()
      .then(vacations => setVacations(vacations))
      .catch(err => notifyService.error(err));
  };

  const getFilteredVacations = (): void => {
    vacationsService.getUserVacations()
      .then(vacations => setVacations(vacations))
      .catch(err => notifyService.error(err));
  };

  const filterVacations = (event: ChangeEvent<HTMLInputElement>): void => {
    const isChecked = event.target.checked;
    if (isChecked === true) {
      getFilteredVacations();
    } else {
      getAllVacations();
    }
    setIsFiltered(isChecked);
  };

  const handleDeleteFollower = (): void => {
    if (isFiltered === true) {
      getFilteredVacations();
    }
  };

  // const indexOfLastVacation = currentPage * vacationPerPage;
  // const indexOfFirstVacation = indexOfLastVacation - vacationPerPage;
  // const currentVacation = vacations.slice(indexOfFirstVacation, indexOfLastVacation);

  return (
    <div className="VacationList">

      {vacations.length === 0 && <Spinner />}

      {
        isAdmin ?
        <div className="AdminButtons">
          <NavLink to="/vacations/new">
            <Add sx={{ fontSize: 50, fontWeight: 'bold' }} className="Add" />
          </NavLink>
          <NavLink to="/vacations/chart">
            <Leaderboard sx={{ fontSize: 50, fontWeight: 'bold' }} className="Add" />
          </NavLink>
        </div> :
        <FormControlLabel
          control={
            <Checkbox
              icon={<FavoriteBorder color="secondary" />}
              checkedIcon={<Favorite />}
              sx={{ '& .MuiSvgIcon-root': { fontSize: 40 } }}
              color="secondary"
              onChange={filterVacations}
              checked={isFiltered}
            />
          }
          label="My Vacations"
          className="Checkbox"
        />
      }

      {vacations.map(v => <VacationCard key={v.id} vacation={v} deleteFollower={handleDeleteFollower} />)}

      <Pagination count={10} color="secondary" />

    </div>
  );
};

export default VacationList;
