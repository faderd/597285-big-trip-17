
const BasePriceRange = {
  MIN: 500,
  MAX: 10000,
};
const RandomHourRange = {
  MIN: 10,
  MAX: 23,
};
import {
  nanoid
} from 'nanoid';
import {
  TYPES,
} from '../const.js';
import {
  getRandomInteger,
} from '../utils/common.js';
import { generateDestination,} from './destination.js';

const getRandomType = () => TYPES[getRandomInteger(0, TYPES.length - 1)];

const generateOffers = () => {
  const availableOffers = Boolean(getRandomInteger());

  if (availableOffers) {
    return new Array(getRandomInteger(1, 3)).fill(undefined).map((el, i) => i + 1);
  }
  return [];
};

export const generatePoint = () => ({
  basePrice: getRandomInteger(BasePriceRange.MIN, BasePriceRange.MAX),
  dateFrom: `2019-07-10T${getRandomInteger(RandomHourRange.MIN, RandomHourRange.MAX)}:55:56.845Z`,
  dateTo: '2019-07-11T11:21:13.375Z',
  destination: generateDestination(),
  id: nanoid(),
  isFavorite: Boolean(getRandomInteger()),
  offers: generateOffers(),
  type: getRandomType(),
});
