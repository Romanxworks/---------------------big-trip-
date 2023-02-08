import {FilterType} from '../const.js';
import {isFutureDate, isPastDate} from './date.js';

const filter = {
  [FilterType.EVERYTHING]: (points) => points,
  [FilterType.FUTURE]: (points) => points.filter((point) => isFutureDate(point.dateFrom)),
  [FilterType.PAST]: (points) => points.filter((point) => isPastDate(point.dateTo)),
};

export {filter};
