import dayjs from 'dayjs';

const sortByPrice = (pointA, pointB) => pointB.basePrice - pointA.basePrice;

const sortByTime = (pointA, pointB) =>{
  const diffA = dayjs(pointA.dateFrom).diff(dayjs(pointA.dateTo));
  const diffB = dayjs(pointB.dateFrom).diff(dayjs(pointB.dateTo));
  return diffA - diffB;
};

const sortByDay = (pointA, pointB) => {
  if(dayjs(pointB.dateFrom).isBefore(dayjs(pointA.dateFrom))){
    return 1;
  }
  if(dayjs(pointB.dateFrom).isAfter(dayjs(pointA.dateFrom))){
    return -1;
  }
  return 0;
};

export {sortByPrice, sortByTime, sortByDay};
