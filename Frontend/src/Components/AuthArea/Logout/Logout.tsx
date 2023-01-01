import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../../../Services/AuthService';
import notifyService from '../../../Services/NotifyService';

const Logout: React.FC = (): JSX.Element => {

  const navigate = useNavigate();

  useEffect(() => {

    authService.logout();

    notifyService.success("Goodbye and have a magical day");

    navigate("/login");

  }, []);

  return null;
};

export default Logout;
