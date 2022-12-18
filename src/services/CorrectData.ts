export class CorrectDate {
    public sendDateDB = (timestamp: string) => {
        const newTimestamp = timestamp.split(" ")
        const time = newTimestamp[1]
        let newDate = newTimestamp[0].split("/");
      return `${newDate[2]}-${newDate[1]}-${newDate[0]} ${time}`;
    };
  
    public currentDateFormatted = (date: string) => {
      let newDate: Date = new Date(date);
      const newFormattedDate: string =
        newDate.getDate() +
        "/" +
        (newDate.getMonth() + 1) +
        "/" +
        newDate.getFullYear();
      return newFormattedDate;
    };
  }