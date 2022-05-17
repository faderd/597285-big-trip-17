const FISH = ['Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget.', 'Fusce tristique felis at fermentum pharetra.', 'Aliquam id orci ut lectus varius viverra.', 'Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.', 'Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.', 'Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.', 'Sed sed nisi sed augue convallis suscipit in sed felis.', 'Aliquam erat volutpat.', 'Nunc fermentum tortor ac porta dapibus.', 'In rutrum ac purus sit amet tempus.'];
const PHOTO_URL = 'http://picsum.photos/248/152?r=';
const PhotoRandomRange = {
  MIN: 0,
  MAX: 10,
};

import { nanoid } from 'nanoid';
import {
  TYPES,
} from '../const.js';
import {
  getRandomInteger,
  getRandomUniqueArray,
} from '../utils/common.js';

const getRandomType = () => TYPES[getRandomInteger(0, TYPES.length - 1)];
const getRandomCity = () => {
  const cities = ['Amsterdam', 'Chamonix', 'Geneva'];
  return cities[getRandomInteger(0, cities.length - 1)];
};
const generateDescription = () => getRandomUniqueArray(FISH).join(' ');

const generateDestination = () => ({
  description: generateDescription(),
  name: getRandomCity(),
  pictures: [{
    src: `${PHOTO_URL}${getRandomInteger(PhotoRandomRange.MIN, PhotoRandomRange.MAX)}`,
    description: FISH[getRandomInteger(0, FISH.length - 1)],
  }],
});

const generateOffers = () => {
  const availableOffers = Boolean(getRandomInteger());

  if (availableOffers) {
    return new Array(getRandomInteger(1, 3)).fill(undefined).map((el, i) => i + 1);
  }
  return [];
};

export const generatePoint = () => ({
  basePrice: 1100,
  dateFrom: '2019-07-10T22:55:56.845Z',
  dateTo: '2019-07-11T11:21:13.375Z',
  destination: generateDestination(),
  id: nanoid(),
  isFavorite: Boolean(getRandomInteger()),
  offers: generateOffers(),
  type: getRandomType(),
});
