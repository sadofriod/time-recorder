export const timeConvert = (startTime: number) => {
  const sDate = new Date(startTime);
  const sDay = sDate.getDate();
  const sMounth = sDate.getMonth();
  const sHour = sDate.getHours();
  const sMin = sDate.getMinutes();
  const sSec = sDate.getSeconds();

  return [sSec, Date.now() - startTime >= 60000 ? sMin - 1 : sMin, sHour, sDay, sMounth, '*'];
};
