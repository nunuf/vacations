import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import { Undo } from '@mui/icons-material';
import noImage from '../../../Assets/Images/no-image.png';
import VacationModel from '../../../Models/VacationModel';
import notifyService from '../../../Services/NotifyService';
import vacationsService from '../../../Services/VacationsService';
import appConfig from '../../../Utils/Config';

import './VacationDetails.css';

const VacationDetails: React.FC = (): JSX.Element => {

  const params = useParams();
  const navigate = useNavigate();
  const [vacation, setVacation] = useState<VacationModel>();

  useEffect(() => {
    const id = params.vacationId;
    vacationsService.getOneVacation(id)
      .then(vacation => setVacation(vacation))
      .catch(err => {
        notifyService.error(err);
        navigate('/*');
      });
  }, []);

  return (
    <div className="VacationDetails">
      {
        vacation &&
        <>
          <div className="Title">{vacation.destination}</div>
          <p>Description: {vacation.description}</p>
          <p>{new Date(vacation.startDate).toLocaleDateString()} - {new Date(vacation.endDate).toLocaleDateString()}</p>
          <p>Price: ${vacation.price}</p>
          {
            vacation.imageName ?
            <img src={appConfig.vacationImagesUrl + vacation.imageName} alt="" /> :
            <img src={noImage} alt="" />
          }
          <br />
          <br />
          <NavLink to="/vacations" className="Back"><Undo /> Back</NavLink>
        </>
      }
    </div>
  );
};

export default VacationDetails;