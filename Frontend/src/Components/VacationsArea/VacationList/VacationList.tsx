import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Add } from '@mui/icons-material';
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
  const [currentPage, setCurrentPage] = useState(1);
  // const [vacationPerPage, setVacationPerPage] = useState(3);
  // const [currentVacation, setCurrentVacation] = useState();

  useEffect(() => {
    return setIsAdmin(user?.role === RoleModel.Admin);
  }, [user]);

  useVerifyLoggedIn();

  useEffect(() => {
    vacationsService.getAllVacations()
      .then(vacations => setVacations(vacations))
      .catch(err => notifyService.error(err));
  }, []);

  // const indexOfLastVacation = currentPage * vacationPerPage;
  // const indexOfFirstVacation = indexOfLastVacation - vacationPerPage;
  // const currentVacation = vacations.slice(indexOfFirstVacation, indexOfLastVacation);

  return (
    <div className="VacationList">

      {vacations.length === 0 && <Spinner />}

      {
        isAdmin &&
        <NavLink to="/vacations/new"><Add sx={{ fontSize: 50, fontWeight: 'bold' }} className="Add" /></NavLink>
      }

      {vacations.map(v => <VacationCard key={v.id} vacation={v} />)}
      
      <Pagination count={10} color="secondary" />

    </div>
  );
};

export default VacationList;
