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

const VACATIONS_PER_PAGE = 10;

const VacationList: React.FC = (): JSX.Element => {

  const user = useUser();
  const [isLoading, setIsLoading] = useState(false);
  const [isAdmin, setIsAdmin] = useState(user?.role === RoleModel.Admin);
  const [vacations, setVacations] = useState<VacationModel[]>([]);
  const [isFiltered, setIsFiltered] = useState(false);
  const [allPage, setAllPage] = useState(1);
  const [filteredPage, setFilteredPage] = useState(1);
  const [currentPageVacations, setCurrentPageVacations] = useState([]);

  useEffect(() => {
    return setIsAdmin(user?.role === RoleModel.Admin);
  }, [user]);

  useVerifyLoggedIn();

  useEffect(() => {
    getAllVacations();
  }, []);
  
  const getAllVacations = (): void => {
    setIsLoading(true);
    vacationsService.getAllVacations()
      .then(allVacations => {
        setVacations(allVacations);
        setCurrentPageVacations(getVacationsPerPage(allVacations, allPage));
        setIsLoading(false);
      })
      .catch(err => {
        notifyService.error(err);
        setIsLoading(false);
      });
  };

  const getFilteredVacations = (): void => {
    setIsLoading(true);
    vacationsService.getUserVacations()
      .then(filteredVacations => {
        setVacations(filteredVacations);
        setCurrentPageVacations(getVacationsPerPage(filteredVacations, filteredPage));
        setIsLoading(false);
      })
      .catch(err => {
        notifyService.error(err);
        setIsLoading(false);
      });
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

  const getVacationsPerPage = (vacationList: VacationModel[], value: number): VacationModel[] => {
    const indexOfLastVacation = value * VACATIONS_PER_PAGE;
    const indexOfFirstVacation = indexOfLastVacation - VACATIONS_PER_PAGE;
    return vacationList.slice(indexOfFirstVacation, indexOfLastVacation);
  };

  const handlePagination = (event: ChangeEvent<unknown>, value: number): void => {
    setCurrentPageVacations(getVacationsPerPage(vacations, value));
    !isFiltered ? setAllPage(value) : setFilteredPage(value);
  };

  return (
    <div className="VacationList">

      {
        isAdmin ?
        <div className="AdminButtons">
          <NavLink to="/vacations/new">
            <Add sx={{ fontSize: 50, fontWeight: 'bold' }} className="Add" />
          </NavLink>
          {
            vacations.length > 0 &&
            <NavLink to="/vacations/chart">
              <Leaderboard sx={{ fontSize: 50, fontWeight: 'bold' }} className="Add" />
            </NavLink>
          }
        </div> :
        <>
          {
            vacations.length > 0 &&
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
        </>
      }
      
      {
        isLoading &&
        <div className="Spinner"><Spinner /></div>
      }

      {
        !isLoading && vacations.length === 0 &&
        <div className="Title Center">No vacations found</div>
      }

      {
        !isLoading && vacations.length > 0 &&
        <>
          {
            currentPageVacations.map(
              v =>
              <VacationCard key={v.id} vacation={v} deleteFollower={handleDeleteFollower} />
            )
          }
          <Pagination
            count={Math.ceil(vacations.length / VACATIONS_PER_PAGE)}
            page={!isFiltered ? allPage : filteredPage}
            onChange={handlePagination}
            color="secondary"
            className="Pagination"
          />
        </>
      }

    </div>
  );
};

export default VacationList;
