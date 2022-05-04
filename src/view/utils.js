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

const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

const humanizePointDate = (date) => dayjs(date).format('MMM DD');

const getRandomUniqueArray = (array) => {
  const newArrayLength = getRandomInteger(1, array.length);
  const copyArray = array.slice();

  return new Array(newArrayLength).fill(undefined).map(() => {
    const elementIndex = getRandomInteger(0, copyArray.length - 1);
    const element = copyArray[elementIndex];
    copyArray.splice(elementIndex, 1);
    return element;
  });
};

const formatDate = (date, formatString) => dayjs(date).format(formatString);

export {
  getTimeFromDate,
  getTimeDifference,
  humanizePointDate,
  getRandomInteger,
  getRandomUniqueArray,
  formatDate,
};
