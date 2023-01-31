import {getRandomInteger, generateRandomValue, generateRandomArrayNumber} from '../utils.js';
import {TYPES} from '../const.js';
import { getDestinations } from './destination.js';

const destinations = getDestinations();

export const generatePoint = () => ({
  id:'',
  basePrice: getRandomInteger(100, 5000),
  dateFrom: '2023-07-10T22:55:56.845Z',
  dateTo: '2023-07-11T11:22:13.375Z',
  destination: generateRandomValue(destinations),
  offers: generateRandomArrayNumber(getRandomInteger(0,5)),
  isFavorite: Boolean(getRandomInteger(0,1)),
  type: generateRandomValue(TYPES),
});

