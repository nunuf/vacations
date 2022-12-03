import React, { BaseSyntheticEvent, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import { Clear, Close, PhotoCamera, Send } from '@mui/icons-material';
import { Button, ButtonGroup, IconButton, TextField } from '@mui/material';
import VacationModel from '../../../Models/VacationModel';
import notifyService from '../../../Services/NotifyService';
import vacationsService from '../../../Services/VacationsService';
import appConfig from '../../../Utils/Config';
import useVerifyLoggedIn from '../../../Utils/useVerifyLoggedIn';

import './EditVacation.css';

const EditVacation: React.FC = (): JSX.Element => {

  const { register, handleSubmit, formState, setValue } = useForm<VacationModel>();
  const navigate = useNavigate();
  const params = useParams();
  const [imageName, setImageName] = useState<string>('');
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
    const id = params.vacationId; // Same name as router parameter
    vacationsService.getOneVacation(id)
      .then(vacation => {
        setValue("id", vacation.id);
        setValue("description", vacation.description);
        setValue("destination", vacation.destination);
        setValue("startDate", vacation.startDate);
        setValue("endDate", vacation.endDate);
        setValue("price", vacation.price);
        setValue("imageName", vacation.imageName);
        setImageName(vacation.imageName);
      })
      .catch(err => notifyService.error(err));
  }, []);

  const send = async (vacation: VacationModel): Promise<void> => {
    try {
      await vacationsService.updateVacation(vacation);
      notifyService.success("Vacation has been successfully updated");
      navigate("/vacations");
    }
    catch (err: any) {
      notifyService.error(err);
    }
  };

  return (
    <div className="EditVacation Box">
      
      <NavLink to="/vacations" className="Close"><Close /></NavLink>
      
      <div className="Title">Edit Vacation</div>

      <form onSubmit={handleSubmit(send)}>

        <input type="hidden" {...register("id")} />
        
        <TextField
          variant="outlined"
          label="Destination"
          InputLabelProps={{ shrink: true }}
          className="TextBox"
          error={formState.errors.destination?.message !== undefined}
          helperText={formState.errors.destination?.message}
          {...register("destination", VacationModel.destinationValidation)}
        />
        <TextField
          variant="outlined"
          label="Description"
          InputLabelProps={{ shrink: true }}
          className="TextBox"
          error={formState.errors.description?.message !== undefined}
          helperText={formState.errors.description?.message}
          {...register("description", VacationModel.descriptionValidation)}
        />
        <TextField
          type="date"
          variant="outlined" 
          label="Start Date"
          InputLabelProps={{ shrink: true }}
          className="TextBox"
          error={formState.errors.startDate?.message !== undefined}
          helperText={formState.errors.startDate?.message}
          InputProps={{inputProps: { min: `${new Date().toISOString().split('T')[0]}` } }}
          {...register("startDate", VacationModel.startDateValidation)}
        />
        <TextField
          type="date"
          variant="outlined"
          label="End Date"
          InputLabelProps={{ shrink: true }}
          className="TextBox"
          error={formState.errors.endDate?.message !== undefined}
          helperText={formState.errors.endDate?.message}
          InputProps={{inputProps: { min: `${new Date().toISOString().split('T')[0]}` } }}
          {...register("endDate", VacationModel.endDateValidation)} 
        />
        <TextField
          type="number"
          variant="outlined"
          label="Price"
          InputLabelProps={{ shrink: true }}
          className="TextBox"
          error={formState.errors.price?.message !== undefined}
          helperText={formState.errors.price?.message}
          {...register("price", VacationModel.priceValidation)}
        />
        <div className="Preview">
          <IconButton color="primary" aria-label="upload picture" component="label">
            <input hidden type="file" accept="image/*" onChangeCapture={onSelectFile} {...register("image")} />
            <PhotoCamera />
          </IconButton>
          {
            preview ?
            <img src={preview} width="80" height="75" alt='' /> : // preview for new uploaded image
            <>
              {/* preview for current image from backend */}
              <img src={appConfig.vacationImagesUrl + imageName} width="80" height="75" alt='' />
              <input type="hidden" {...register("imageName")} />
            </>
          }
        </div>
        
        <ButtonGroup variant="contained" fullWidth>
          <Button color="primary" type="submit" startIcon={<Send />}>Edit</Button>
          <Button color="secondary" type="reset" startIcon={<Clear />}>Clear</Button>
        </ButtonGroup>

      </form>

    </div>
  );
};

export default EditVacation;
