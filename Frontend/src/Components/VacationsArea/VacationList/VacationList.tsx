import React, { ChangeEvent, useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Add, Favorite, FavoriteBorder, Leaderboard } from '@mui/icons-material';
import { Checkbox, FormControlLabel, Tooltip } from '@mui/material';
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

  // On user changes
  useEffect(() => {
    // Check if admin
    return setIsAdmin(user?.role === RoleModel.Admin);
  }, [user]);

  // Check if logged in
  useVerifyLoggedIn();

  useEffect(() => {
    getAllVacations();
  }, []);

  // Get all vacations 
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

  // Get followed vacations
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

  // Filter vacations handler
  const filterVacations = (event: ChangeEvent<HTMLInputElement>): void => {
    const isChecked = event.target.checked;
    if (isChecked === true) {
      getFilteredVacations();
    } else {
      getAllVacations();
    }
    setIsFiltered(isChecked);
  };

  // Unfollow vacation handler
  const handleFollowerDeleted = (): void => {
    if (isFiltered === true) {
      getFilteredVacations();
    }
  };

  // Delete vacation handler
  const handleVacationDeleted = (): void => {
    getAllVacations();
  };

  // Get current page vacations
  const getVacationsPerPage = (vacationList: VacationModel[], value: number): VacationModel[] => {
    const indexOfLastVacation = value * VACATIONS_PER_PAGE;
    const indexOfFirstVacation = indexOfLastVacation - VACATIONS_PER_PAGE;
    return vacationList.slice(indexOfFirstVacation, indexOfLastVacation);
  };

  // Pagination handler
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
            <Tooltip title="Add new vacation">
              <Add sx={{ fontSize: 50 }} />
            </Tooltip>
          </NavLink>
          {
            vacations.length > 0 &&
            <NavLink to="/vacations/chart">
              <Tooltip title="Go to charts">
                <Leaderboard sx={{ fontSize: 50 }} />
              </Tooltip>
            </NavLink>
          }
        </div> :
        <>
          {
            vacations.length > 0 &&
            <Tooltip title={isFiltered ? 'Show All Vacations' : 'Show Only My Vacations'}>
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
            </Tooltip>
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
              <VacationCard
                key={v.id}
                vacation={v}
                followerDeleted={handleFollowerDeleted}
                vacationDeleted={handleVacationDeleted}
              />
            )
          }
          <Pagination
            count={Math.ceil(vacations.length / VACATIONS_PER_PAGE)}
            page={!isFiltered ? allPage : filteredPage}
            onChange={handlePagination}
            color="secondary"
            className="Pagination"
            showFirstButton
            showLastButton
          />
        </>
      }

    </div>
  );
};

export default VacationList;
