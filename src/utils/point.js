import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
dayjs.extend(duration);

const Millisecond = {
  HOUR: 3600000,
  DAY: 86400000,
};

const getTimeFromDate = (date) => dayjs(date).format('HH:mm');

const getTimeDifference = (dateFrom, dateTo) => {
  const date1 = dayjs(dateFrom);
  const date2 = dayjs(dateTo);
  const diffTime = date2.diff(date1);

  if (diffTime < Millisecond.HOUR) {
    return dayjs.duration(diffTime).format('mm[M]');
  }

  if (diffTime < Millisecond.DAY) {
    return dayjs.duration(diffTime).format('HH[H] mm[M]');
  }

  return dayjs.duration(diffTime).format('DD[D] HH[H] mm[M]');
};

const humanizePointDate = (date) => dayjs(date).format('MMM DD');

const formatDate = (date, formatString) => dayjs(date).format(formatString);

const getCurrentDate = () => dayjs().format('YYYY-MM-DD');

const sortPointDay = (pointA, pointB) => dayjs(pointA.dateFrom) - dayjs(pointB.dateFrom);

const sortPointPrice = (pointA, pointB) => pointB.basePrice - pointA.basePrice;

const sortPointTime = (pointA, pointB) => {
  const timeA = dayjs(pointA.dateTo) - dayjs(pointA.dateFrom);
  const timeB = dayjs(pointB.dateTo) - dayjs(pointB.dateFrom);

  return timeB - timeA;
};

const isDatesEqual = (dateA, dateB) => (dateA === null && dateB === null) || dayjs(dateA).isSame(dateB);

export {
  getTimeFromDate,
  getTimeDifference,
  humanizePointDate,
  formatDate,
  getCurrentDate,
  sortPointDay,
  sortPointPrice,
  sortPointTime,
  isDatesEqual,
};
