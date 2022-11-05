class VacationModel {
  public id: number;
  public description: string;
  public destination: string;
  public fromDate: Date;
  public toDate: Date;
  public price: number;
  public imageName: string;
  public image: FileList;
  public subscribers: number;

  public static descriptionValidation = {
    required: {value: true, message: 'Missing description'},
    minLength: {value: 10, message: 'Description too short'},
    maxLength: {value: 1000, message: 'Description too long'},
  }
  public static destinationValidation = {
    required: {value: true, message: 'Missing destination'},
    minLength: {value: 2, message: 'Destination too short'},
    maxLength: {value: 100, message: 'Destination too long'},
  }
  public static fromDateValidation = {
    required: {value: true, message: 'Missing from date'}
  }
  public static toDateValidation = {
    required: {value: true, message: 'Missing to date'}
  }
  public static priceValidation = {
    required: {value: true, message: 'Missing destination'},
    pattern: {value: /^[0-9]+$/i, message: 'Price invalid'}
  }
}

export default VacationModel;