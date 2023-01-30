import NewEventButtonView from './view/new-event-button-view.js';
import TripInfoView from './view/trip-info-view.js';
import FilterListView from './view/filter-list-view.js';
// import SortListView from './view/sort-list-view.js';
import EventsPresenter from './presenter/events-presenter.js';
import {render, RenderPosition} from './render.js';

const siteHeaderElement = document.querySelector('.page-header');
const headerMainContainer = siteHeaderElement.querySelector('.trip-main');
const filtersContainer = siteHeaderElement.querySelector('.trip-controls__filters');
const siteTripEventsContainer = document.querySelector('.trip-events');
const eventsPresenter = new EventsPresenter();

render(new NewEventButtonView(), headerMainContainer);
render(new TripInfoView(), headerMainContainer, RenderPosition.AFTERBEGIN);
render(new FilterListView(), filtersContainer);

eventsPresenter.init(siteTripEventsContainer);

// render(new SortListView(), siteTripEventsContainer);

