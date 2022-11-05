import React from 'react';
import { NavLink } from 'react-router-dom';
import VacationModel from '../../../Models/VacationModel';
import appConfig from '../../../Utils/Config';
import noImage from '../../../Assets/Images/no-image.jpg'

import './VacationCard.css';

interface VacationCardProps {
  vacation: VacationModel;
}

const VacationCard: React.FC<VacationCardProps> = ({ vacation }): JSX.Element => {
  return (
    <div className="VacationCard Box">
      <div>
        <NavLink to={"/vacations/details/" + vacation.id}>
          {
            vacation.imageName ?
            <img src={appConfig.vacationImagesUrl + vacation.imageName} alt='' /> :
            <img src={noImage} alt='' />
          }
        </NavLink>
      </div>
      <div className="Card">
        {vacation.destination}
        <br />
        From: {vacation.fromDate.toLocaleString()}
        <br />
        To: {vacation.toDate.toLocaleString()}
        <br />
        Price: {vacation.price}
      </div>
    </div>
  );
};

export default VacationCard;
