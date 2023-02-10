import {getRandomInteger, generateRandomValue, generateRandomArrayNumber} from '../utils/utils.js';
import{getRandomDay} from '../utils/date.js';
import {TYPES} from '../const.js';
import {getDestinations} from './destination.js';

const destinations = getDestinations();

export const generatePoint = () => {
  const {dateFrom, dateTo} = getRandomDay();
  return {
    id:'',
    basePrice: getRandomInteger(100, 5000),
    dateFrom,
    dateTo,
    destination: generateRandomValue(destinations),
    offers: generateRandomArrayNumber(getRandomInteger(0,5)),
    isFavorite: Boolean(getRandomInteger(0,1)),
    type: generateRandomValue(TYPES),
  };
};

