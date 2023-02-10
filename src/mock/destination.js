import {getRandomInteger, generateRandomValue} from '../utils/utils.js';
import {CITIES, DESCRIPTIONS} from '../const';

const createPicture = () =>({
  src: `http://picsum.photos/300/200?r=${getRandomInteger(0,8)}`,
  description: generateRandomValue(DESCRIPTIONS)
});


const generateDestination = () => ({
  description: generateRandomValue(DESCRIPTIONS),
  name: '',
  pictures: Array.from({length:getRandomInteger(1,8)}, createPicture)
});

export const getDestinations = () => {
  const destinations = Array.from({length: CITIES.length}, generateDestination);
  destinations.forEach((destination, index) => {
    destination.name = CITIES[index];
  });
  return destinations;
};
