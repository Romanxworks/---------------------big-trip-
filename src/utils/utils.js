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

const updateItem = (items, update) => {
  const index = items.findIndex((item) => item.id === update.id);

  if (index === -1) {
    return items;
  }

  return [
    ...items.slice(0, index),
    update,
    ...items.slice(index + 1),
  ];
};

export {
  getRandomInteger,
  generateRandomValue,
  generateRandomArrayNumber,
  setId,
  updateItem
};
