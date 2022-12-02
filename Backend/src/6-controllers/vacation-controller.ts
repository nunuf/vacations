import express, { Request, Response, NextFunction } from 'express';
import path from 'path';
import cyber from '../2-utils/cyber';
import verifyAdmin from '../3-middleware/verify-admin';
import VacationModel from '../4-models/vacation-model';
import vacationLogic from '../5-logic/vacation-logic';

// Only the routing part of express without the entire server
const router = express.Router();

router.get('/vacations', async (request: Request, response: Response, next: NextFunction) => {
  try {
    const userId = await cyber.verifyUser(request);
    const vacations = await vacationLogic.getAllVacations(userId);
    response.json(vacations);
  } catch (err: any) {
    next(err);
  }
});

router.get('/vacations-by-user', async (request: Request, response: Response, next: NextFunction) => {
  try {
    const userId = await cyber.verifyUser(request);
    const vacations = await vacationLogic.getUserVacations(userId);
    response.json(vacations);
  } catch (err: any) {
    next(err);
  }
});

router.get('/vacations/:id', async (request: Request, response: Response, next: NextFunction) => {
  try {
    const userId = await cyber.verifyUser(request);
    const id = request.params.id;
    const vacation = await vacationLogic.getOneVacation(id, userId);
    response.json(vacation);
  } catch (err: any) {
    next(err);
  }
});

router.post('/vacations', verifyAdmin, async (request: Request, response: Response, next: NextFunction) => {
  try {
    // Take uploaded file, set it to the body
    request.body.image = request.files?.image;

    const vacation = new VacationModel(request.body);
    const addedVacation = await vacationLogic.addVacation(vacation);
    response.status(201).json(addedVacation);
  } catch (err: any) {
    next(err);
  }
});

router.put('/vacations/:id', verifyAdmin, async (request: Request, response: Response, next: NextFunction) => {
  try {
    request.body.id = request.params.id;

    // Take uploaded file, set it to the body
    request.body.image = request.files?.image;

    const vacation = new VacationModel(request.body);
    const updatedVacation = await vacationLogic.updateVacation(vacation);
    response.json(updatedVacation);
  } catch (err: any) {
    next(err);
  }
});

router.delete('/vacations/:id', verifyAdmin, async (request: Request, response: Response, next: NextFunction) => {
  try {
    const id = request.params.id;
    await vacationLogic.deleteVacation(id);
    response.sendStatus(204);
  } catch (err: any) {
    next(err);
  }
});

router.get('/vacations/images/:imageName', async (request: Request, response: Response, next: NextFunction) => {
  try {
    const imageName = request.params.imageName;
    const fullPath = path.join(__dirname, '..', '1-assets', 'images', imageName);
    response.sendFile(fullPath);
  } catch (err: any) {
    next(err);
  }
});

export default router;