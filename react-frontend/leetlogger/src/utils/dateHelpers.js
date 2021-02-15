export const getStartOfDayInMiliseconds = (date) => {
  const retDate = new Date(date);
  retDate.setHours(0, 0, 0, 0);
  return retDate.getTime();
};

export const milisecondsToDateString = (date) => {
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const resDate = new Date(date);
  return resDate.toLocaleDateString("en-US", options);
};

export const getTodaysDateInFormattedString = () => {
  return milisecondsToDateString(getStartOfDayInMiliseconds(new Date()));
};

export const getYesterdaysDateInFormattedString = () => {
  return milisecondsToDateString(
    getStartOfDayInMiliseconds(new Date().getDate() - 1)
  );
};
