import { UploadedFile } from 'express-fileupload';
import Joi from 'joi';

class VacationModel {
  public id: string;
  public destination: string;
  public description: string;
  public fromDate: Date;
  public toDate: Date;
  public price: number;
  public image: UploadedFile;
  public imageName: string;
 
  public constructor(vacation: VacationModel) {
   this.id = vacation.id;
   this.destination = vacation.destination;
   this.description = vacation.description;
   this.fromDate = vacation.fromDate;
   this.toDate = vacation.toDate;
   this.price = vacation.price;
   this.image = vacation.image;
   this.imageName = vacation.imageName;
  } 

  public static validationSchema = Joi.object({
    id: Joi.string().optional(),
    destination: Joi.string().required().min(2).max(30),
    description: Joi.string().required().min(10).max(1000),
    fromDate: Joi.date().required().iso(),
    toDate: Joi.date().required().iso(),
    price: Joi.number().required().positive(),
    image: Joi.object().optional(),
    imageName: Joi.string().optional()
  });

  public validate(): string {
    const result = VacationModel.validationSchema.validate(this);
    return result.error?.message;
  }  
 }
 
 export default VacationModel;