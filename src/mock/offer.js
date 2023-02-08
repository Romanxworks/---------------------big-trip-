import {getRandomInteger, generateRandomValue, setId} from '../utils/utils.js';
import {TYPES, TITLES} from '../const';

const createElementOffer = () =>({
  id: '',
  title: generateRandomValue(TITLES),
  price: getRandomInteger(0,250)
});


export const generateOffer = () => ({
  type: '',
  offers: setId(Array.from({length:getRandomInteger(2,8)}, createElementOffer))
});

export const getMainOffers = () => {
  const offers = Array.from({length: TYPES.length}, generateOffer);
  for(let i=0;i<TYPES.length;i++){
    offers[i].type = TYPES[i];
  }
  return offers;
};
