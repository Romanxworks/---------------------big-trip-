import {getRandomInteger, generateRandomValue, generateRandomArrayNumber} from '../utils.js';
import {TYPES} from '../const.js';
import { getDestinations } from './destination.js';
import dayjs from 'dayjs';

const destinations = getDestinations();

export const generatePoint = () => ({
  id:'',
  basePrice: getRandomInteger(100, 5000),
  dateFrom: dayjs().subtract(getRandomInteger(1,5), 'hour').format(),
  dateTo: dayjs().add(getRandomInteger(5,59), 'minute').format(),
  destination: generateRandomValue(destinations),
  offers: generateRandomArrayNumber(getRandomInteger(0,5)),
  isFavorite: Boolean(getRandomInteger(0,1)),
  type: generateRandomValue(TYPES),
});

