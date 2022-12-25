class Utils {

  // Formatting date string to 'yyyy-MM-dd'
  public static format = (dateString: string): string => {
    return dateString.split('.').reverse().join('-');
  };

  public static getDate = (dateValue: Date | string): string => {
    return new Date(dateValue).toLocaleDateString('he-IL', { year: "numeric", month: "2-digit", day: "2-digit" });
  };

}

export default Utils;