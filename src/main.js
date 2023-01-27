import NewEventButtonView from './view/new-event-button-view.js';
import TripInfoView from './view/trip-info-view.js';
import FilterListView from './view/filter-list-view.js';
import SortListView from './view/sort-list-view.js';
// import AddDeletePointView from './view/add-delete-point-view.js';
import {render, RenderPosition} from './render.js';

const siteHeaderElement = document.querySelector('.page-header');
const headerMainContainer = siteHeaderElement.querySelector('.trip-main');
const filtersContainer = siteHeaderElement.querySelector('.trip-controls__filters');
const siteTripEventsContainer = document.querySelector('.trip-events');
// const siteTripEventsListContainer = siteTripEventsContainer.querySelector('.trip-events__list');

render(new NewEventButtonView(), headerMainContainer);
render(new TripInfoView(), headerMainContainer, RenderPosition.AFTERBEGIN);
render(new FilterListView(), filtersContainer);
render(new SortListView(), siteTripEventsContainer);
// render(new AddDeletePointView(), siteTripEventsListContainer);

