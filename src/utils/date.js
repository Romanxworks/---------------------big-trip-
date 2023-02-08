import dayjs from 'dayjs';

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

const isFutureDate = (date) => dayjs().isBefore(dayjs(date))||dayjs().isSame(dayjs(date));

const isPastDate = (date) => dayjs().isAfter(dayjs(date))||dayjs().isSame(dayjs(date));

const getDayFrom = () => dayjs();
const getDayTo = () => dayjs().add(30, 'minute');

export {
  formatDate,
  getDifferentDate,
  isPastDate,
  isFutureDate,
  getDayFrom,
  getDayTo
};
