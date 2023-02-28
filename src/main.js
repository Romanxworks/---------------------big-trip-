import EventsPresenter from './presenter/events-presenter.js';
import PointModel from './model/point-model.js';
import HeaderPresenter from './presenter/header-presenter.js';
import HeaderModel from './model/header-model.js';

const headerMainContainer = document.querySelector('.trip-main');
const siteTripEventsContainer = document.querySelector('.trip-events');

const pointModel = new PointModel();
const headerModel = new HeaderModel();

const eventsPresenter = new EventsPresenter(siteTripEventsContainer, pointModel, headerModel);
const headerPresenter = new HeaderPresenter(headerMainContainer, pointModel, headerModel, eventsPresenter.createPoint);

headerPresenter.init();
eventsPresenter.init();
