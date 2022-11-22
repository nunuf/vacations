import React, { BaseSyntheticEvent, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { NavLink, useNavigate } from 'react-router-dom';
import { Send, Clear, PhotoCamera, Close } from '@mui/icons-material';
import { Button, ButtonGroup, IconButton, TextField } from '@mui/material';
import VacationModel from '../../../Models/VacationModel';
import notifyService from '../../../Services/NotifyService';
import vacationsService from '../../../Services/VacationsService';
import useVerifyLoggedIn from '../../../Utils/useVerifyLoggedIn';

import './AddVacation.css';

const AddVacation: React.FC = (): JSX.Element => {

  const { formState, handleSubmit, register } = useForm<VacationModel>();
  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState<File>();
  const [preview, setPreview] = useState<string>();

  useVerifyLoggedIn();

  useEffect(() => {
    if (!selectedFile) {
      setPreview(undefined);
      return;
    }
    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);
    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);

  function onSelectFile(e: BaseSyntheticEvent) {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile(undefined);
      return;
    }
    setSelectedFile(e.target.files[0]);
  }

  async function send(vacation: VacationModel) {
    try {
      await vacationsService.addVacation(vacation);
      notifyService.success("Vacation has been successfully added");
      navigate("/vacations");
    }
    catch (err: any) {
      notifyService.error(err);
    }
  }

  return (
    <div className="AddVacation Box">
      
      <NavLink to="/vacations" className="Close"><Close /></NavLink>

      <div className="Title">Add Vacation</div>

      <form onSubmit={handleSubmit(send)}>

        <TextField 
          variant="outlined"
          label="Destination"
          className="TextBox"
          error={formState.errors.destination?.message !== undefined}
          helperText={formState.errors.destination?.message}
          {...register("destination", VacationModel.destinationValidation)}
        />
        <TextField
          variant="outlined"
          label="Description"
          className="TextBox"
          error={formState.errors.description?.message !== undefined}
          helperText={formState.errors.description?.message}
          {...register("description", VacationModel.descriptionValidation)}
        />
        <TextField
          type="date"
          variant="outlined" 
          label="From Date"
          InputLabelProps={{ shrink: true }}
          className="TextBox"
          error={formState.errors.startDate?.message !== undefined}
          helperText={formState.errors.startDate?.message}
          {...register('startDate', VacationModel.startDateValidation)}
        />
        <TextField
          type="date"
          variant="outlined"
          label="To Date"
          InputLabelProps={{ shrink: true }}
          className="TextBox"
          error={formState.errors.endDate?.message !== undefined}
          helperText={formState.errors.endDate?.message}
          {...register('endDate', VacationModel.endDateValidation)} 
        />
        <TextField
          type="number"
          variant="outlined"
          label="Price"
          className="TextBox"
          error={formState.errors.price?.message !== undefined}
          helperText={formState.errors.price?.message}
          {...register("price", VacationModel.priceValidation)}
        />
        <div className="Preview">
          <IconButton color="secondary" aria-label="upload picture" component="label">
            <input hidden type="file" accept="image/*" onChangeCapture={onSelectFile} {...register('image')} />
            <PhotoCamera />
          </IconButton>
          <img src={preview} width="80" height="75" alt='' />{/* preview for uploaded image */}
        </div>
    
        <ButtonGroup variant="contained" fullWidth>
          <Button color="primary" type="submit" startIcon={<Send />}>Add</Button>
          <Button color="secondary" type="reset" startIcon={<Clear />}>Clear</Button>
        </ButtonGroup>

      </form>

    </div>
  );
};

export default AddVacation;
