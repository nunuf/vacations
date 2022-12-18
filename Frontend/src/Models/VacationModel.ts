class VacationModel {
  public id: string;
  public description: string;
  public destination: string;
  public startDate: Date;
  public endDate: Date;
  public price: number;
  public imageName: string;
  public image: FileList;
  public isFollowing: number;
  public followersCount: number;

  public static descriptionValidation = {
    required: { value: true, message: 'Missing description' },
    minLength: { value: 5, message: 'Description too short' },
    maxLength: { value: 500, message: 'Description too long' },
  }
  public static destinationValidation = {
    required: { value: true, message: 'Missing destination' },
    minLength: { value: 2, message: 'Destination too short' },
    maxLength: { value: 100, message: 'Destination too long' },
  }
  public static startDateValidation = {
    required: { value: true, message: 'Missing start date' }
  }
  public static endDateValidation = {
    required: { value: true, message: 'Missing end date' }
  }
  public static priceValidation = {
    required: { value: true, message: 'Missing price' },
    min: { value: 1, message: 'Invalid price' }
  }
  public static imageValidation = {
    required: { value: true, message: 'Missing image' }
  }
}

export default VacationModel;