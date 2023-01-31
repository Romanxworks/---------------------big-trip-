const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

const generateRandomValue = (array) => {
  const randomIndex = getRandomInteger(0, array.length - 1);
  return array[randomIndex];
};

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
  for(let i=0; i< array.length; i++){
    array[i].id = i;
  }
  return array;
};


export {getRandomInteger, generateRandomValue, generateRandomArrayNumber, setId};
