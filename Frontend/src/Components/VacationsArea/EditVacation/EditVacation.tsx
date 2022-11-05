import React, { BaseSyntheticEvent, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { Clear, PhotoCamera, Send } from '@mui/icons-material';
import { Button, ButtonGroup, IconButton, TextField } from '@mui/material';
import VacationModel from '../../../Models/VacationModel';
import notifyService from '../../../Services/NotifyService';
import vacationsService from '../../../Services/VacationsService';
import appConfig from '../../../Utils/Config';

import './EditVacation.css';

const EditVacation: React.FC = (): JSX.Element => {

  const { register, handleSubmit, formState, setValue } = useForm<VacationModel>();
  const navigate = useNavigate();
  const params = useParams();
  const [imageName, setImageName] = useState<string>('');
  const [selectedFile, setSelectedFile] = useState<File>();
  const [preview, setPreview] = useState<string>();

  useEffect(() => {
    if (!selectedFile) {
      setPreview(undefined);
      return;
    }
    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);
    
    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);

  function onSelectFile(e: BaseSyntheticEvent) {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile(undefined);
      return;
    }
    setSelectedFile(e.target.files[0]);
  }

  useEffect(() => {
    const id = +params.vacationId; // Same name as router parameter.
    vacationsService.getOneVacation(id)
      .then(vacation => {
        setValue("id", vacation.id);
        setValue("description", vacation.description);
        setValue("destination", vacation.destination);
        setValue("fromDate", vacation.fromDate);
        setValue("toDate", vacation.toDate);
        setValue("price", vacation.price);
        setImageName(vacation.imageName);
      })
      .catch(err => notifyService.error(err));
  }, []);

  async function send(vacation: VacationModel) {
    try {
      await vacationsService.updateVacation(vacation);
      notifyService.success("Vacation has been successfully updated");
      navigate("/vacations");
    }
    catch (err: any) {
      notifyService.error(err);
    }
  }

  return (
    <div className="EditVacation Box">

      <form onSubmit={handleSubmit(send)}>

        <h2>Edit Vacation</h2>

        <input type="hidden" {...register("id")} />
        
        <TextField label="Destination" variant="outlined" className="TextBox" InputLabelProps={{
            shrink: true,}} {...register("destination", VacationModel.destinationValidation)} />
        <span className="Error">{formState.errors.destination?.message}</span>

        <TextField label="Description" defaultValue="" variant="outlined" className="TextBox" InputLabelProps={{
            shrink: true,}} {...register("description", VacationModel.descriptionValidation)} />
        <span className="Error">{formState.errors.description?.message}</span>

        <TextField variant="outlined" type="date" className="TextBox" helperText="From Date" {...register('fromDate')} />
        <TextField variant="outlined" type="date" className="TextBox" helperText="To Date" {...register('toDate')} />
        
        <TextField label="Price" variant="outlined" type="number" className="TextBox" InputLabelProps={{
            shrink: true,}} {...register("price", VacationModel.priceValidation)} />
        <span className="Error">{formState.errors.price?.message}</span>

        <IconButton color="primary" aria-label="upload picture" component="label">
          <input hidden accept="image/*" type="file" onChangeCapture={onSelectFile} {...register('image')} />
          <PhotoCamera />
          {preview ? <img src={preview} width="80" height="75" alt='' /> : <img src={appConfig.vacationImagesUrl + imageName} width="80" height="75" alt='' />}
        </IconButton>
        
        <ButtonGroup variant="contained" fullWidth>
          <Button color="primary" type="submit" startIcon={<Send />}>Edit</Button>
          <Button color="secondary" type="reset" startIcon={<Clear />}>Clear</Button>
        </ButtonGroup>

      </form>

    </div>
  );
};

export default EditVacation;
