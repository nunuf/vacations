import React, { BaseSyntheticEvent, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { Send, Clear, PhotoCamera } from '@mui/icons-material';
import { TextField, ButtonGroup, Button, IconButton } from '@mui/material';
import VacationModel from '../../../Models/VacationModel';
import notifyService from '../../../Services/NotifyService';
import vacationsService from '../../../Services/VacationsService';
import useVerifyLoggedIn from '../../../Utils/useVerifyLoggedIn';

import './AddVacation.css';

const AddVacation: React.FC = (): JSX.Element => {
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

  const { register, handleSubmit, formState } = useForm<VacationModel>();
  const navigate = useNavigate();

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

      <form onSubmit={handleSubmit(send)}>

        <h2>Add Vacation</h2>

        <TextField label="Destination" defaultValue="" variant="outlined" className="TextBox" helperText={formState.errors.destination?.message} {...register("destination", VacationModel.destinationValidation)} />
        <TextField label="Description" defaultValue="" variant="outlined" className="TextBox" {...register("description", VacationModel.descriptionValidation)} />
        <span className="Error">{formState.errors.description?.message}</span>
        <TextField variant="outlined" type="date" className="TextBox" helperText="From Date" {...register('fromDate')} />
        <TextField variant="outlined" type="date" className="TextBox" helperText="To Date" {...register('toDate')} />
        <TextField label="Price" variant="outlined" type="number" className="TextBox" {...register("price", VacationModel.priceValidation)} />
        <span className="Error">{formState.errors.price?.message}</span>

        <IconButton color="primary" aria-label="upload picture" component="label">
          <input hidden accept="image/*" type="file" onChangeCapture={onSelectFile} {...register('image')} />
          <PhotoCamera />
          <img src={preview} width="80" height="75" alt='' />
        </IconButton>
    
        <ButtonGroup variant="contained" fullWidth>
          <Button color="primary" type="submit" startIcon={<Send />}>Add</Button>
          <Button color="secondary" type="reset" startIcon={<Clear />}>Clear</Button>
        </ButtonGroup>

      </form>

    </div>
  );
};

export default AddVacation;
