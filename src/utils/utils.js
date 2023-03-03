const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

const generateRandomValue = (array) => array[getRandomInteger(0, array.length-1)];

const generateRandomArrayNumber = (count) => {
  const newArr = Array.from({length: count}, ()=>getRandomInteger(1,5));
  const result= [];
  for (const num of newArr) {
    if (!result.includes(num)) {
      result.push(num);
    }
  }
  return result;
};

const setId = (array) => {
  array.forEach((element, index) => {
    element.id = index;
  });
  return array;
};

const addDeleteValue = (value, array = []) => {
  const newVal = Number(value);
  if(array.includes(newVal)){
    return array.filter((val) => val !== newVal);
  }
  array.push(newVal);
  return array;
};

const getCities = (destinations) => {
  const cities = [];
  destinations.forEach((destination) => {
    if(!cities.includes(destination.name)){
      cities.push(destination.name);
    }
  });
  return cities;
};

export {
  getRandomInteger,
  generateRandomValue,
  generateRandomArrayNumber,
  setId,
  addDeleteValue,
  getCities
};
