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

  const { formState, handleSubmit, register } = useForm<UserModel>();
  const navigate = useNavigate();

  const send = async (user: UserModel): Promise<void> => {
    try {
      await authService.register(user);
      notifyService.success("Welcome!");
      navigate("/vacations");
    }
    catch (err: any) {
      notifyService.error(err);
    }
  };

  return (
    <div className="Register Box">

      <form onSubmit={handleSubmit(send)}>

        <h2>Register</h2>

        <TextField
          variant="outlined"
          label="First name"
          className="TextBox"
          error={formState.errors.firstName?.message !== undefined}
          helperText={formState.errors.firstName?.message}
          {...register("firstName", UserModel.firstNameValidation)}
        />
        <TextField
          variant="outlined"
          label="Last name"
          className="TextBox"
          error={formState.errors.lastName?.message !== undefined}
          helperText={formState.errors.lastName?.message}
          {...register("lastName", UserModel.lastNameValidation)}
        />
        <TextField
          variant="outlined"
          label="Username"
          className="TextBox"
          error={formState.errors.username?.message !== undefined}
          helperText={formState.errors.username?.message}
          {...register("username", UserModel.usernameValidation)}
        />
        <TextField
          variant="outlined"
          label="Password"
          type="password"
          className="TextBox"
          error={formState.errors.password?.message !== undefined}
          helperText={formState.errors.password?.message}
          {...register("password", UserModel.passwordValidation)}
        />

        <ButtonGroup variant="contained" fullWidth className="Buttons">
          <Button color="primary" type="submit" startIcon={<Send />} disabled={Object.values(formState.dirtyFields).length < 4}>Register</Button>
          <Button color="secondary" type="reset" startIcon={<Clear />}>Clear</Button>
        </ButtonGroup>

      </form>

      <NavLink to="/login">Login</NavLink>

    </div>
  );
};

export default Register;
