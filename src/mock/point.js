import {getRandomInteger, generateRandomValue, generateRandomArrayNumber} from '../utils/utils.js';
import {TYPES} from '../const.js';
import { getDestinations } from './destination.js';
import dayjs from 'dayjs';

const randomTime = ['day', 'hour', 'minute'];
const destinations = getDestinations();

export const generatePoint = () => ({
  id:'',
  basePrice: getRandomInteger(100, 5000),
  dateFrom: dayjs().subtract(getRandomInteger(-1,5), generateRandomValue(randomTime)).format(),
  dateTo: dayjs().add(getRandomInteger(0,10), generateRandomValue(randomTime)).format(),
  destination: generateRandomValue(destinations),
  offers: generateRandomArrayNumber(getRandomInteger(0,5)),
  isFavorite: Boolean(getRandomInteger(0,1)),
  type: generateRandomValue(TYPES),
});

