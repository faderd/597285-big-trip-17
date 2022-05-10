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

export {
  getTimeFromDate,
  getTimeDifference,
  humanizePointDate,
  formatDate,
};
