import EventsPresenter from './presenter/events-presenter.js';
import PointModel from './model/point-model.js';
import HeaderPresenter from './presenter/header-presenter.js';


const headerMainContainer = document.querySelector('.trip-main');
const siteTripEventsContainer = document.querySelector('.trip-events');
const pointModel = new PointModel();
const eventsPresenter = new EventsPresenter(siteTripEventsContainer, pointModel);
const headerPresenter = new HeaderPresenter(headerMainContainer, pointModel);


headerPresenter.init();
eventsPresenter.init();


