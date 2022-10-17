export const getDateStringFromDateAndTimeString = (dateAndTimeString: string) => {
  return dateAndTimeString.split('T')[0];
};

export const getDateFromString = (dateString: string) => {
  const date = new Date(dateString);
  if (date.toString() == 'Invalid Date') {
    return new Date();
  } else {
    return date;
  }
};

export const getFormattedDateFromDateObject = (date: Date) => {
  return date.toLocaleDateString('fr-CA');
};

export const getFormattedDateStringFromDateString = (dateString: string) => {
  const date = new Date(dateString);
  if (date.toString() == 'Invalid Date') {
    return dateString;
  } else {
    return getFormattedDateFromDateObject(date);
  }
};
