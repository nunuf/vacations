import Joi from 'joi';

class FollowerModel {
  public vacationId: string;
  public userId: string;
 
  public constructor(follower: FollowerModel) {  
    this.vacationId = follower.vacationId;
    this.userId = follower.userId;
  }

  public static validationSchema = Joi.object({
    vacationId: Joi.string().required().uuid(),
    userId: Joi.string().required().uuid()
  });

  public validate(): string {
    const result = FollowerModel.validationSchema.validate(this);
    return result.error?.message;
  }
}

export default FollowerModel;