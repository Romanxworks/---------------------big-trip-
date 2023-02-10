import dayjs from 'dayjs';
import {getRandomInteger, generateRandomValue} from './utils.js';

const formatDate = (date, format) => dayjs(date).format(format);

const TIME_TYPES = ['day', 'hour', 'minute'];

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

const isFutureDate = (date) => dayjs().isBefore(dayjs(date))||dayjs().isSame(dayjs(date));

const isPastDate = (date) => dayjs().isAfter(dayjs(date))||dayjs().isSame(dayjs(date));

const getRandomDay = () => {
  const firstDay = dayjs().subtract(getRandomInteger(-5,15), generateRandomValue(TIME_TYPES));
  const secondDay = dayjs().subtract(getRandomInteger(-5,13), generateRandomValue(TIME_TYPES));
  if(secondDay.isBefore(firstDay)){
    return{
      dateFrom: secondDay.format(),
      dateTo: firstDay.format()
    };
  }
  return{
    dateFrom: firstDay.format(),
    dateTo: secondDay.format()
  };

};

export {
  formatDate,
  getDifferentDate,
  isPastDate,
  isFutureDate,
  getRandomDay
};
