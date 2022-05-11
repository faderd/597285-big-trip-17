import { FilterTypes, } from '../const.js';
import { getCurrentDate, } from './point.js';

const filters = {
  [FilterTypes.EVERYTHING]: (tasks) => tasks,
  [FilterTypes.PAST]: (tasks) => tasks.filter((task) => task.dateFrom >= getCurrentDate()),
  [FilterTypes.FUTURE]: (tasks) => tasks.filter((task) => task.dateTo < getCurrentDate()),
};

export {filters,};
