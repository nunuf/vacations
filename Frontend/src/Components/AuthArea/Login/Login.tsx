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

  // Login with user's credentials
  const send = async (credentials: CredentialsModel): Promise<void> => {
    try {
      await authService.login(credentials);
      notifyService.success("Welcome Back!");
      navigate("/vacations");
    }
    catch (err: any) {
      notifyService.error(err);
    }
  };

  return (
    <div className="Login Dialog Box">
      
      <h2>Login</h2>

      <form onSubmit={handleSubmit(send)}>

        <div className="Container">

          <TextField label="Username" variant="outlined" className="TextBox" {...register("username")} />
          <TextField label="Password" variant="outlined" type="password" className="TextBox" {...register("password")} />

          <ButtonGroup variant="contained" fullWidth className="Buttons">
            <Button color="primary" type="submit" startIcon={<Send className="MobileMode" />} disabled={!formState.dirtyFields.username || !formState.dirtyFields.password}>Send</Button>
            <Button color="secondary" type="reset" startIcon={<Clear className="MobileMode" />}>Clear</Button>
          </ButtonGroup>

        </div>

      </form>
      
      <NavLink to="/register">Register</NavLink>

    </div>
  );
};

export default Login;
