import express, { NextFunction, Request, Response } from 'express';
import FollowerModel from '../4-models/follower-model';
import followerLogic from '../5-logic/follower-logic';

// Only the routing part of express without the entire server
const router = express.Router();

router.post('/followers', async (request: Request, response: Response, next: NextFunction) => {
  try {
    const follower = new FollowerModel(request.body);
    const addedFollower = await followerLogic.addFollower(follower);
    response.status(201).json(addedFollower);
  } catch (err: any) {
    next(err);
  }
});

router.delete('/followers/:vacationId/:userId', async (request: Request, response: Response, next: NextFunction) => {
  try {
    const vacationId = request.params.vacationId;
    const userId = request.params.userId;
    await followerLogic.deleteFollower(vacationId, userId);
    response.sendStatus(204);
  } catch (err: any) {
    next(err);
  }
});

export default router;