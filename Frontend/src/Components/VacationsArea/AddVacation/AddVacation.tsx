import React, { BaseSyntheticEvent, ChangeEvent, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { NavLink, useNavigate } from 'react-router-dom';
import { Send, Clear, PhotoCamera, Close } from '@mui/icons-material';
import { Button, ButtonGroup, IconButton, TextField } from '@mui/material';
import VacationModel from '../../../Models/VacationModel';
import notifyService from '../../../Services/NotifyService';
import vacationsService from '../../../Services/VacationsService';
import useVerifyLoggedIn from '../../../Utils/useVerifyLoggedIn';
import Utils from '../../../Utils/Utils';

import './AddVacation.css';

const AddVacation: React.FC = (): JSX.Element => {

  const { formState, handleSubmit, register } = useForm<VacationModel>();
  const navigate = useNavigate();
  const [startDate, setStartDate] = useState({ value: '', isDirty: false });
  const [endDate, setEndDate] = useState({ value: '', isDirty: false });
  const [selectedFile, setSelectedFile] = useState<File>();
  const [preview, setPreview] = useState<string>();

  useVerifyLoggedIn();

  useEffect(() => {
    // Prompt confirmation when reload page is triggered
    window.onbeforeunload = () => { return ''; };
    if (window.confirm) {
      vacationsService.getAllVacations()
        .then(vacations => vacations)
        .catch(err => notifyService.error(err));
    }
    // Unmount the window.onbeforeunload event
    return () => { window.onbeforeunload = null; };
  }, []);

  // On selected file changes
  useEffect(() => {
    if (!selectedFile) {
      setPreview(undefined);
      return;
    }
    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);
    // Free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);
  
  // Set selected file
  const onSelectFile = (e: BaseSyntheticEvent): void => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile(undefined);
      return;
    }
    setSelectedFile(e.target.files[0]);
  };

  // Add new vacation
  const send = async (vacation: VacationModel) => {
    try {
      setStartDate({ ...startDate, isDirty: true });
      setEndDate({ ...endDate, isDirty: true });
      const vacationToAdd = { ...vacation, startDate: new Date(startDate.value), endDate: new Date(endDate.value) };
      await vacationsService.addVacation(vacationToAdd);
      notifyService.success('Vacation has been successfully added');
      navigate('/vacations');
    }
    catch (err: any) {
      notifyService.error(err);
    }
  };

  // Clear form
  const clear = (): void => {
    setStartDate({ value: '', isDirty: false });
    setEndDate({ value: '', isDirty: false });
    setSelectedFile(undefined);
    setPreview('');
  };

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
          label="Start Date"
          InputLabelProps={{ shrink: true }}
          className="TextBox"
          InputProps={{ inputProps: { min: `${Utils.format(Utils.getDate(new Date()))}` } }}
          value={startDate.value}
          onChange={(event: ChangeEvent<HTMLInputElement>) => setStartDate({ value: event.target.value, isDirty: true })}
          onBlur={() => setStartDate({ ...startDate, isDirty: true })}
        />
        {startDate.isDirty === true && !startDate.value && <div className='DateError'>Missing start date</div>}
        {startDate.value && endDate.value && endDate.value < startDate.value && <div className='DateError'>Start date should be before end date</div>}
        <TextField
          type="date"
          variant="outlined"
          label="End Date"
          InputLabelProps={{ shrink: true }}
          className="TextBox"
          InputProps={{
            inputProps: {
              min: `${
                startDate.value ?
                Utils.format(Utils.getDate(startDate.value)) :
                Utils.format(Utils.getDate(new Date()))
              }`
            }
          }}
          value={endDate.value}
          onChange={(event: ChangeEvent<HTMLInputElement>) => setEndDate({ value: event.target.value, isDirty: true })}
          onBlur={() => setEndDate({ ...endDate, isDirty: true })}
        />
        {endDate.isDirty === true && !endDate.value && <div className='DateError'>Missing end date</div>}
        {startDate.value && endDate.value && endDate.value < startDate.value && <div className='DateError'>End date should be after start date</div>}
        <TextField
          type="number"
          variant="outlined"
          label="Price"
          className="TextBox"
          InputProps={{ inputProps: { step: 0.01 } }}
          error={formState.errors.price?.message !== undefined}
          helperText={formState.errors.price?.message}
          {...register("price", VacationModel.priceValidation)}
        />
        <div className="Preview">
          <IconButton color="secondary" aria-label="upload picture" component="label">
            <input hidden type="file" accept="image/*" onChangeCapture={onSelectFile} {...register("image", VacationModel.imageValidation)} />
            <PhotoCamera />
          </IconButton>
          <img src={preview} width="80" height="75" alt='' />{/* preview for uploaded image */}
        </div>
        <div>{formState.errors.image?.message}</div>

        <ButtonGroup variant="contained" fullWidth>
          <Button color="primary" type="submit" startIcon={<Send />} disabled={!formState.errors || !startDate.value || !endDate.value}>Add</Button>
          <Button color="secondary" type="reset" startIcon={<Clear />} onClick={clear}>Clear</Button>
        </ButtonGroup>

      </form>

    </div>
  );
};

export default AddVacation;
