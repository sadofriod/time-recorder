export const timeConvert = (startTime: number) => {
  const sDate = new Date(startTime);
  const sDay = sDate.getDate();
  const sMounth = sDate.getMonth();
  const sHour = sDate.getHours();
  const sMin = sDate.getMinutes();
  const sSec = sDate.getSeconds();
  const realMin = Date.now() - startTime >= 70000 ? sMin - 1 : sMin;
  const calcMin = realMin < 0 ? 59 : realMin;
  console.log('任务运行的分钟', calcMin);

  return [sSec, calcMin, sHour, sDay, sMounth, '*'];
};
