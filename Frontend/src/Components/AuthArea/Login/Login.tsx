import { useForm } from 'react-hook-form';
import { NavLink, useNavigate } from 'react-router-dom';
import { Clear, Send } from '@mui/icons-material';
import { Button, ButtonGroup, TextField } from '@mui/material';
import CredentialsModel from '../../../Models/CredentialsModel';
import authService from '../../../Services/AuthService';
import notifyService from '../../../Services/NotifyService';

import './Login.css';

const Login: React.FC = (): JSX.Element => {

  const { formState, handleSubmit, register } = useForm<CredentialsModel>();
  const navigate = useNavigate();

  async function send(credentials: CredentialsModel) {
    try {
      await authService.login(credentials);
      notifyService.success("Welcome Back!");
      navigate("/vacations");
    }
    catch (err: any) {
      notifyService.error(err);
    }
  }

  return (
    <div className="Login Box">

      <form onSubmit={handleSubmit(send)}>

        <h2>Login</h2>

        <TextField label="Username" variant="outlined" className="TextBox" {...register("username")} />
        <TextField label="Password" variant="outlined" type="password" className="TextBox" {...register("password")} />

        <ButtonGroup variant="contained" fullWidth className="Buttons">
          <Button color="primary" type="submit" startIcon={<Send />} disabled={!formState.dirtyFields.username || !formState.dirtyFields.password}>Send</Button>
          <Button color="secondary" type="reset" startIcon={<Clear />}>Clear</Button>
        </ButtonGroup>

      </form>
      
      <NavLink to="/register">Register</NavLink>

    </div>
  );
};

export default Login;
