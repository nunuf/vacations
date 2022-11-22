import React from 'react';
import { useForm } from 'react-hook-form';
import { NavLink, useNavigate } from 'react-router-dom';
import { Send, Clear } from '@mui/icons-material';
import { Button, ButtonGroup, TextField } from '@mui/material';
import UserModel from '../../../Models/UserModel';
import authService from '../../../Services/AuthService';
import notifyService from '../../../Services/NotifyService';

import './Register.css';

const Register: React.FC = (): JSX.Element => {

  const { register, handleSubmit } = useForm<UserModel>();
  const navigate = useNavigate();

  async function send(user: UserModel) {
    try {
      await authService.register(user);
      notifyService.success("Welcome!");
      navigate("/vacations");
    }
    catch (err: any) {
      notifyService.error(err);
    }
  }

  return (
    <div className="Register Box">

      <form onSubmit={handleSubmit(send)}>

        <h2>Register</h2>

        <TextField label="First name" variant="outlined" className="TextBox" {...register("firstName")} />
        <TextField label="Last name" variant="outlined" className="TextBox" {...register("lastName")} />
        <TextField label="Username" variant="outlined" className="TextBox" {...register("username")} />
        <TextField label="Password" variant="outlined" type="password" className="TextBox" {...register("password")} />

        <ButtonGroup variant="contained" fullWidth className="Buttons">
          <Button color="primary" type="submit" startIcon={<Send />}>Register</Button>
          <Button color="secondary" type="reset" startIcon={<Clear />}>Clear</Button>
        </ButtonGroup>
        
      </form>
      
      <NavLink to="/login">Login</NavLink>

    </div>
  );
};

export default Register;
