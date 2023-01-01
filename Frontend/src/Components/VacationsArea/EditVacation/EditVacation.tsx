import React, { BaseSyntheticEvent, ChangeEvent, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import { Clear, Close, PhotoCamera, Send } from '@mui/icons-material';
import { Button, ButtonGroup, IconButton, TextField } from '@mui/material';
import VacationModel from '../../../Models/VacationModel';
import notifyService from '../../../Services/NotifyService';
import vacationsService from '../../../Services/VacationsService';
import appConfig from '../../../Utils/Config';
import useVerifyLoggedIn from '../../../Utils/useVerifyLoggedIn';
import Utils from '../../../Utils/Utils';

import './EditVacation.css';

const EditVacation: React.FC = (): JSX.Element => {

  const { register, handleSubmit, formState, setValue } = useForm<VacationModel>();
  const navigate = useNavigate();
  const params = useParams();
  const [startDate, setStartDate] = useState({ value: '', isDirty: false });
  const [endDate, setEndDate] = useState({ value: '', isDirty: false });
  const [imageName, setImageName] = useState<string>('');
  const [selectedFile, setSelectedFile] = useState<File>();
  const [preview, setPreview] = useState<string>();

  useVerifyLoggedIn();

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

  // Set selected vacation to edit
  useEffect(() => {
    const id = params.vacationId;
    vacationsService.getOneVacation(id)
      .then(vacation => {
        setValue("id", vacation.id);
        setValue("description", vacation.description);
        setValue("destination", vacation.destination);
        setStartDate({ value: Utils.format(Utils.getDate(vacation.startDate)), isDirty: false });
        setEndDate({ value: Utils.format(Utils.getDate(vacation.endDate)), isDirty: false });
        setValue("price", vacation.price);
        setValue("imageName", vacation.imageName);
        setImageName(vacation.imageName);
      })
      .catch(err => notifyService.error(err));
  }, []);

  // Update existing vacation
  const send = async (vacation: VacationModel): Promise<void> => {
    try {
      const vacationToUpdate = { ...vacation, startDate: new Date(startDate.value), endDate: new Date(endDate.value) };
      await vacationsService.updateVacation(vacationToUpdate);
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
          InputProps={{ inputProps: { min: `${Utils.format(Utils.getDate(new Date()))}` } }}
          value={startDate.value}
          onChange={(event: ChangeEvent<HTMLInputElement>) => setStartDate({ value: event.target.value, isDirty: true })}
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
        />
        {endDate.isDirty === true && !endDate.value && <div className='DateError'>Missing end date</div>}
        {startDate.value && endDate.value && endDate.value < startDate.value && <div className='DateError'>End date should be after start date</div>}
        <TextField
          type="number"
          variant="outlined"
          label="Price"
          InputLabelProps={{ shrink: true }}
          className="TextBox"
          InputProps={{ inputProps: { step: 0.01 } }}
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
          <Button
            color="primary"
            type="submit"
            startIcon={<Send />}
            disabled={!Object.values(formState.dirtyFields).includes(true) && !startDate.isDirty === true && !endDate.isDirty === true}
          >
            Edit
          </Button>
          <Button color="secondary" type="reset" startIcon={<Clear />}>Clear</Button>
        </ButtonGroup>

      </form>

    </div>
  );
};

export default EditVacation;
