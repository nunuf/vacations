import React from 'react';
import { NavLink } from 'react-router-dom';
import useUser from '../../../Utils/useUser';

import './AuthMenu.css';

const AuthMenu: React.FC = (): JSX.Element => {

  const user = useUser();

  return (
    <div className="AuthMenu">
      {
        !user &&
        <span>Hello Guest</span>
      }
      {
        user &&
        <>
          <span>Hello {user.firstName} {user.lastName} | </span>
          <NavLink to="/logout">Logout</NavLink>
        </>
      }
    </div>
  );
};

export default AuthMenu;
