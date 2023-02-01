import dayjs from 'dayjs';

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

const formatDate = (date, format) => dayjs(date).format(format);

const getDifferentDate = (dateFrom, dateTo) => {
  let hour = dayjs(dateFrom).diff(dayjs(dateTo), 'hour');
  let min = dayjs(dateFrom).diff(dayjs(dateTo), 'minute');
  const day = dayjs(dateFrom).diff(dayjs(dateTo), 'day');
  if(day >= 1){
    min = min - hour*60 > 9? min-hour*60 : `0${min-hour*60}`;
    hour = hour-day*24 > 9? hour-day*24 : `0${hour-day*24}`;
    return (`0${day}D ${hour}H ${min}M`);
  }
  if(hour >= 1){
    min = min - hour*60 > 9? min-hour*60 : `0${min-hour*60}`;
    hour = hour > 9? hour : `0${hour}`;
    return (`${hour}H ${min}M`);
  }
  return (`${min}M`);

};

export {
  getRandomInteger,
  generateRandomValue,
  generateRandomArrayNumber,
  setId,
  formatDate,
  getDifferentDate
};
