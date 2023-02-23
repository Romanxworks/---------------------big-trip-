import dayjs from 'dayjs';
import {getRandomInteger, generateRandomValue} from './utils.js';

const formatDate = (date, format) => dayjs(date).format(format);

const TIME_TYPES = ['day', 'hour', 'minute'];

const getDifferentDate = (dateFrom, dateTo) => {
  let hour = dayjs(dateFrom).diff(dayjs(dateTo), TIME_TYPES[1]);
  let min = dayjs(dateFrom).diff(dayjs(dateTo), TIME_TYPES[2]);
  const day = dayjs(dateFrom).diff(dayjs(dateTo), TIME_TYPES[0]);

  if(day >= 1){
    min = min - hour*60 > 9? min-hour*60 : `0${min-hour*60}`;
    hour = hour-day*24 > 9? hour-day*24 : `0${hour-day*24}`;
    return (`${day > 9? `${day}D`: `0${day}D`} ${hour}H ${min}M`);
  }
  if(hour >= 1){
    min = min - hour*60 > 9? min-hour*60 : `0${min-hour*60}`;
    hour = hour > 9? hour : `0${hour}`;
    return (`${hour}H ${min}M`);
  }
  return (`${min}M`);

};

const isFutureDate = (date) => dayjs().isBefore(dayjs(date))||dayjs().isSame(dayjs(date));

const isPastDate = (date) => dayjs().isAfter(dayjs(date))||dayjs().isSame(dayjs(date));

const getRandomDay = () => {
  const firstDay = dayjs().subtract(getRandomInteger(-5,15), generateRandomValue(TIME_TYPES));
  const secondDay = dayjs().subtract(getRandomInteger(-10,5), generateRandomValue(TIME_TYPES));
  if(secondDay.isBefore(firstDay)){
    return{
      dateFrom: secondDay.toISOString(),
      dateTo: firstDay.toISOString(),
    };
  }
  return{
    dateFrom: firstDay.toISOString(),
    dateTo: secondDay.toISOString(),
  };

};

const isDateEqual = (point, update) => {
  const isDateFromEqual = dayjs(point.dateFrom).isSame(dayjs(update.dateFrom), 'minute');
  const isDateToEqual = dayjs(point.dateTo).isSame(dayjs(update.dateTo), 'minute');

  return isDateFromEqual && isDateToEqual;
};

export {
  formatDate,
  getDifferentDate,
  isPastDate,
  isFutureDate,
  getRandomDay,
  isDateEqual
};
