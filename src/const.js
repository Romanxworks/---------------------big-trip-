import dayjs from 'dayjs';

const TYPES = ['taxi', 'bus', 'train', 'ship', 'drive', 'flight', 'check-in', 'sightseeing', 'restaurant'];

const CITIES = ['Moscow', 'Saint-Petersburg', 'Voronezh', 'Belgorod', 'Volgograd', 'Gelendzhik', 'Krasnodar'];

const DESCRIPTIONS = [
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  'Cras aliquet varius magna, non porta ligula feugiat eget.',
  'Fusce tristique felis at fermentum pharetra.',
  'Aliquam id orci ut lectus varius viverra.',
  'Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.',
  'Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.',
  'Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.',
  'Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat.',
  'Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.'
];

const TITLES = ['Add luggage','Switch to comfort class','Add meal','Choose seats','Travel by train'];

const  PointFormat = {
  MONTH: 'MMM D',
  HOUR: 'HH:mm',
  DAY: 'DD/MM/YY HH:mm'
};

const FilterType = {
  EVERYTHING: 'everything',
  FUTURE: 'future',
  PAST: 'past',
};

const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
};

const SORT_TYPES = ['day', 'event', 'time', 'price', 'offer'];

const SortType = {
  DAY: 'day',
  TIME: 'time',
  PRICE: 'price',
};

const BASE_DESTINATION = {
  description: '',
  name: '',
  pictures: []
};

const BASE_POINT = {
  basePrice: 100,
  dateFrom: dayjs().toISOString(),
  dateTo: dayjs().add(30, 'minute').toISOString(),
  destination: BASE_DESTINATION,
  type: 'taxi',
  isFavorite:false,
  isNew: true,
  offers: []
};

const UserAction = {
  ADD_POINT: 'ADD_POINT',
  UPDATE_POINT: 'UPDATE_POINT',
  DELETE_POINT: 'ELETE_POINT'
};

const UpdateType = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
  INIT: 'INIT',
};

const MIN_POINTS_COUNT = 3;
export{TYPES,
  CITIES,
  DESCRIPTIONS,
  TITLES,
  PointFormat,
  FilterType,
  Mode,
  SORT_TYPES,
  SortType,
  BASE_POINT,
  BASE_DESTINATION,
  UserAction,
  UpdateType,
  MIN_POINTS_COUNT
};
