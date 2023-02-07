export const formattingDate = (value: string) => {
  const date = new Date(value);
  let minutes;
  if (date.getMinutes() < 10) {
    minutes = '0' + date.getMinutes();
  } else {
    minutes = date.getMinutes();
  }
  const formattedDate = date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear() + ', ' + date.getHours() + ':' + minutes;
  return formattedDate;
};
