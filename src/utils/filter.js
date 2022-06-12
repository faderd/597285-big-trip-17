import { FilterType, } from '../const.js';
import { getCurrentDate, } from './point.js';

const filter = {
  [FilterType.EVERYTHING]: (tasks) => tasks,
  [FilterType.PAST]: (tasks) => tasks.filter((task) => task.dateFrom < getCurrentDate()),
  [FilterType.FUTURE]: (tasks) => tasks.filter((task) => task.dateTo >= getCurrentDate()),
};

export {filter};
