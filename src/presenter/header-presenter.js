import { render } from '../framework/render.js';
import TripInfoView from '../view/trip-info-view.js';
import FilterListView from '../view/filter-list-view.js';
import NewEventButtonView from '../view/new-event-button-view.js';
import {generateFilter} from '../mock/filter.js';

export default class HeaderPresenter {
  #headerContainer = null;
  #pointModel = null;
  #tripInfo = new TripInfoView();
  #newEventButton = new NewEventButtonView();
  #filter = null;

  constructor(headerContainer, pointModel){
    this.#headerContainer = headerContainer;
    this.#pointModel = pointModel;
  }

  init = () => {
    this.#renderTripInfo();
    this.#renderfilterList();
    this.#renderNewEventButton();
  };

  #renderTripInfo = () => {
    render(this.#tripInfo, this.#headerContainer);
  };

  #renderNewEventButton = () => {
    render(this.#newEventButton, this.#headerContainer);
  };

  #renderfilterList = () => {
    this.#filter = generateFilter([...this.#pointModel.points]);
    const filterList = new FilterListView(this.#filter);
    render(filterList, this.#headerContainer);
  };

}
