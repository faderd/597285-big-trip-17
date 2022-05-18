import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
dayjs.extend(duration);

const getTimeFromDate = (date) => dayjs(date).format('HH:mm');

const getTimeDifference = (dateFrom, dateTo) => {
  const date1 = dayjs(dateFrom);
  const date2 = dayjs(dateTo);
  const diffTime = dayjs.duration(date2.diff(date1));

  if (diffTime.hours() < 1) {
    return diffTime.format('mm[M]');
  }

  if (diffTime.days() < 1) {
    return diffTime.format('HH[H] mm[M]');
  }

  return diffTime.format('DD[D] HH[H] mm[M]');
};

const humanizePointDate = (date) => dayjs(date).format('MMM DD');

const formatDate = (date, formatString) => dayjs(date).format(formatString);

const getCurrentDate = () => dayjs().format('YYYY-MM-DD');

const sortPointPrice = (pointA, pointB) => {
  const priceA = pointA.basePrice;
  const priceB = pointB.basePrice;

  if (priceA > priceB) {
    return -1;
  }

  if (priceA < priceB) {
    return 1;
  }

  return 0;
};

const sortPointTime = (pointA, pointB) => {
  const timeA = dayjs(pointA.dateTo) - dayjs(pointA.dateFrom);
  const timeB = dayjs(pointB.dateTo) - dayjs(pointB.dateFrom);

  if (timeA > timeB) {
    return -1;
  }

  if (timeA < timeB) {
    return 1;
  }

  return 0;
};

export {
  getTimeFromDate,
  getTimeDifference,
  humanizePointDate,
  formatDate,
  getCurrentDate,
  sortPointPrice,
  sortPointTime,
};
