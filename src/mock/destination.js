import {getRandomInteger, generateRandomValue} from '../utils.js';
import {CITIES, DESCRIPTIONS} from '../const';

const createPicture = () =>({
  src: `http://picsum.photos/300/200?r=${getRandomInteger(0,8)}`,
  description: generateRandomValue(DESCRIPTIONS)
});


const generateDestination = () => ({
  description: generateRandomValue(DESCRIPTIONS),
  name: '',
  pictures: Array.from({length:getRandomInteger(0,8)}, createPicture)
});

export const getDestinations = () => {
  const destinations = Array.from({length: CITIES.length}, generateDestination);
  for(let i=0;i<CITIES.length;i++){
    destinations[i].name = CITIES[i];
  }
  return destinations;
};
