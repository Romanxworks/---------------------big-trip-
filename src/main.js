import EventsPresenter from './presenter/events-presenter.js';
import PointModel from './model/point-model.js';
import HeaderPresenter from './presenter/header-presenter.js';
import HeaderModel from './model/header-model.js';
import EventApiService from './event-api-service.js';

const AUTHORIZATION = 'Basic hS2sSf44wcl1sadsd';
const END_POINT = 'https://17.ecmascript.pages.academy/big-trip/';

const headerMainContainer = document.querySelector('.trip-main');
const eventsContainer = document.querySelector('.trip-events');

const pointModel = new PointModel(new EventApiService(END_POINT, AUTHORIZATION));
const headerModel = new HeaderModel();

const eventsPresenter = new EventsPresenter(eventsContainer, pointModel, headerModel);
const headerPresenter = new HeaderPresenter(headerMainContainer, pointModel, headerModel, eventsPresenter.createPoint);
pointModel.init().finally(()=>{
  headerPresenter.init();
});
eventsPresenter.init();

