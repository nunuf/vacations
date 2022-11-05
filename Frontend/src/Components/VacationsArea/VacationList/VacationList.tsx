import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import Pagination from '@mui/material/Pagination';
import VacationModel from '../../../Models/VacationModel';
import notifyService from '../../../Services/NotifyService';
import vacationsService from '../../../Services/VacationsService';
import useVerifyLoggedIn from '../../../Utils/useVerifyLoggedIn';
import Spinner from '../../SharedArea/Spinner/Spinner';
import VacationCard from '../VacationCard/VacationCard';

import './VacationList.css';

const VacationList: React.FC = (): JSX.Element => {

  useVerifyLoggedIn();

  const [vacations, setVacations] = useState<VacationModel[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  // const [vacationPerPage, setVacationPerPage] = useState(3);
  // const [currentVacation, setCurrentVacation] = useState();

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

      <NavLink to="/vacations/new"><AddIcon sx={{ fontSize: 50, fontWeight: 'bold' }} /></NavLink>

      {vacations.map(v => <VacationCard key={v.id} vacation={v} />)}
      
      <Pagination count={10} color="secondary" />
    </div>
  );
};

export default VacationList;
