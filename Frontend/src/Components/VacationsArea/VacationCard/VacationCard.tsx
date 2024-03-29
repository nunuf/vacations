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
  followerDeleted: () => void;
  vacationDeleted: () => void;
}

const VacationCard: React.FC<VacationCardProps> = ({ vacation, followerDeleted, vacationDeleted }): JSX.Element => {

  const navigate = useNavigate();
  const user = useUser();
  const [isAdmin, setIsAdmin] = useState(user?.role === RoleModel.Admin);
  const [checked, setChecked] = useState(vacation.isFollowing === 1);

  // On user changes
  useEffect(() => {
    // Check if admin
    return setIsAdmin(user?.role === RoleModel.Admin);
  }, [user]);

  // Follow vacation handler
  const followVacation = async (event: ChangeEvent<HTMLInputElement>) => {
    try {
      const isChecked = event.target.checked;
      if (isChecked) {
        await followersService.addFollower({ vacationId: vacation.id, userId: user.id });
      } else {
        await followersService.deleteFollower(vacation.id, user.id);
        followerDeleted();
      }
      setChecked(isChecked);
    }
    catch (err: any) {
      notifyService.error(err);
    }
  };

  // Delete vacation handler
  const deleteVacation = async (id: string) => {
    try {
      await vacationsService.deleteVacation(id);
      vacationDeleted();
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
          <Tooltip title={`Followers count: ${vacation.followersCount}`}>
            <span>{vacation.followersCount}</span>
          </Tooltip>
          {
            isAdmin ?
            <Checkbox disabled icon={<Favorite />} /> :
            <Tooltip title={checked ? 'Unfollow vacation' : 'Follow vacation'}>
              <Checkbox color="secondary" icon={<FavoriteBorder />} checkedIcon={<Favorite />} checked={checked} onChange={followVacation} />
            </Tooltip>
          }
          {
            isAdmin &&
            <>
              <NavLink to="#" onClick={() => deleteVacation(vacation.id)}>
                <Tooltip title="Delete vacation">
                  <IconButton><Delete color="secondary" /></IconButton>
                </Tooltip>
              </NavLink>
              <NavLink to={"/vacations/edit/" + vacation?.id}>
                <Tooltip title="Edit vacation">
                  <IconButton><Edit color="secondary" /></IconButton>
                </Tooltip>
              </NavLink>
            </>
          }
        </div>
      </div>
    </div>
  );

};

export default VacationCard;
