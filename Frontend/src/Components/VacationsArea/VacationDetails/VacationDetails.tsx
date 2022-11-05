import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import VacationModel from '../../../Models/VacationModel';
import notifyService from '../../../Services/NotifyService';
import vacationsService from '../../../Services/VacationsService';
import appConfig from '../../../Utils/Config';

import './VacationDetails.css';

const VacationDetails: React.FC = (): JSX.Element => {

  const params = useParams();
  const [vacation, setVacation] = useState<VacationModel>();
  const navigate = useNavigate();

  useEffect(() => {
    const id = +params.vacationId;
    vacationsService.getOneVacation(id)
      .then(vacation => setVacation(vacation))
      .catch(err => notifyService.error(err));
  }, []);

  async function deleteVacation(id: number) {
    try {
      await vacationsService.deleteVacation(id);
      notifyService.success("Vacation has been deleted");
      navigate("/vacations");
    }
    catch (err: any) {
      notifyService.error(err);
    }
  }

  return (
    <div className="VacationDetails">
      {
        vacation &&
        <>
          <h1>{vacation.destination}</h1>
          <p>Description: {vacation.description}</p>
          <p>From: {vacation.fromDate.toLocaleString()}</p>
          <p>To: {vacation.toDate.toLocaleString()}</p>
          <p>Price: ${vacation.price}</p>
          <img src={appConfig.vacationImagesUrl + vacation.imageName} alt='' />
        </>
      }

      <br />
      <br />

      <NavLink to="/vacations">Back</NavLink>
      <span> | </span>
      <NavLink to={"/vacations/edit/" + vacation?.id}>Edit</NavLink>
      <span> | </span>
      <NavLink to="#" onClick={() => deleteVacation(vacation.id)}>Delete</NavLink>

    </div>
  );
};

export default VacationDetails;
