import React, { ChangeEvent, useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Checkbox, Fade, IconButton, Tooltip } from '@mui/material';
import { Delete, Edit, Favorite, FavoriteBorder } from '@mui/icons-material';
import VacationModel from '../../../Models/VacationModel';
import appConfig from '../../../Utils/Config';
import noImage from '../../../Assets/Images/no-image.png';
import notifyService from '../../../Services/NotifyService';
import RoleModel from '../../../Models/RoleModel';
import followersService from '../../../Services/FollowersService';
import vacationsService from '../../../Services/VacationsService';
import useUser from '../../../Utils/useUser';

import './VacationCard.css';

interface VacationCardProps {
  vacation: VacationModel;
}

const VacationCard: React.FC<VacationCardProps> = ({ vacation }): JSX.Element => {

  const navigate = useNavigate();
  const user = useUser();
  const [isAdmin, setIsAdmin] = useState(user?.role === RoleModel.Admin);
  const [checked, setChecked] = useState(vacation.isFollowing === 1);

  useEffect(() => {
    return setIsAdmin(user?.role === RoleModel.Admin);
  }, [user]);

  const followVacation = async (event: ChangeEvent<HTMLInputElement>) => {
    const isChecked = event.target.checked;
    if (isChecked) {
      await followersService.addFollower({ vacationId: vacation.id, userId: user.id });
    } else {
      await followersService.deleteFollower(vacation.id, user.id);
    }
    setChecked(isChecked);
  };

  const deleteVacation = async (id: string) => {
    try {
      await vacationsService.deleteVacation(id);
      notifyService.success("Vacation has been deleted");
      navigate("/vacations");
    }
    catch (err: any) {
      notifyService.error(err);
    }
  };

  return (
    <div className="VacationCard Box">
      <div className="Card">
        <div className="Image">
          <NavLink to={"/vacations/details/" + vacation.id}>
            <div className="Destination">{vacation.destination}</div>
            <div className="Border"></div>
            {
              vacation.imageName ?
              <img src={appConfig.vacationImagesUrl + vacation.imageName} alt="" /> :
              <img src={noImage} alt="" />
            }
          </NavLink>
        </div>
        <Tooltip
          color="secondary"
          TransitionComponent={Fade}
          TransitionProps={{ timeout: 600 }}
          title={vacation.description}>
          <div className="Description">{vacation.description}</div>
        </Tooltip>
        <div>
          {new Date(vacation.startDate).toLocaleDateString()}
          {' - '}
          {new Date(vacation.endDate).toLocaleDateString()}
        </div>
        <div>
          Price: ${vacation.price}
        </div>
        <div>
          {vacation.followersCount}
          {
            isAdmin ?
            <Checkbox disabled color="secondary" icon={<FavoriteBorder />} checkedIcon={<Favorite />} /> :
            <Checkbox color="secondary" icon={<FavoriteBorder />} checkedIcon={<Favorite />} checked={checked} onChange={followVacation} />
          }
          {
            isAdmin &&
            <>
              <NavLink to="#" onClick={() => deleteVacation(vacation.id)}>
                <IconButton><Delete color="secondary" /></IconButton>
              </NavLink>
              <NavLink to={"/vacations/edit/" + vacation?.id}>
                <IconButton><Edit color="secondary" /></IconButton>
              </NavLink>
            </>
          }
        </div>
      </div>
    </div>
  );

};

export default VacationCard;
