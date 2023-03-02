import {render, replace, remove} from '../framework/render.js';
import TripInfoView from '../view/trip-info-view.js';
import FilterListView from '../view/filter-list-view.js';
import NewEventButtonView from '../view/new-event-button-view.js';
import {FilterType, UpdateType} from '../const.js';
import {filter} from '../utils/filter.js';
import {sortByDay} from '../utils/sort.js';
export default class HeaderPresenter {
  #headerContainer = null;
  #pointModel = null;
  #headerModel = null;
  #tripInfo = null;
  #newEventButton = null;
  #filter = null;
  #filterList = null;
  #createCallback = null;


  constructor(headerContainer, pointModel, headerModel, callback){
    this.#headerContainer = headerContainer;
    this.#pointModel = pointModel;
    this.#headerModel = headerModel;
    this.#createCallback = callback;

    this.#pointModel.addObserver(this.#handleModelEvent);
    this.#headerModel.addObserver(this.#handleModelEvent);
  }

  init = () => {
    this.#filter = this.filters;
    this.#renderTripInfo();
    this.#renderfilterList();
    this.#renderNewEventButton(this.#createCallback);
  };

  get filters() {
    const points = this.#pointModel.points;
    return [
      {
        type: FilterType.EVERYTHING,
        name: 'everything',
        count: filter[FilterType.EVERYTHING](points).length,
      },
      {
        type: FilterType.FUTURE,
        name: 'future',
        count: filter[FilterType.FUTURE](points).length,
      },
      {
        type: FilterType.PAST,
        name: 'past',
        count: filter[FilterType.PAST](points).length,
      },
    ];
  }

  #renderTripInfo = () => {
    const points = this.#pointModel.points.sort(sortByDay);
    const prevTripInfo = this.#tripInfo;

    this.#tripInfo = new TripInfoView(points);

    if(prevTripInfo === null){
      render(this.#tripInfo, this.#headerContainer);
      return;
    }

    replace(this.#tripInfo, prevTripInfo);
    remove(prevTripInfo);

  };

  #renderNewEventButton = () => {
    const prevnewEventButton = this.#newEventButton;
    this.#newEventButton = new NewEventButtonView();
    this.#newEventButton.setClickHandler(this.#createCallback);

    if(prevnewEventButton === null){
      render(this.#newEventButton, this.#headerContainer);
      return;
    }
    replace(this.#newEventButton, prevnewEventButton);
    remove(prevnewEventButton);
  };

  #renderfilterList = () => {
    const prevFilterList = this.#filterList;
    this.#filterList = new FilterListView(this.#filter, this.#headerModel.filter);

    this.#filterList.setFilterChangeHandler(this.#handleFilterTypeChange);

    if(prevFilterList === null){
      render(this.#filterList, this.#headerContainer);
      return;
    }

    replace(this.#filterList, prevFilterList);
    remove(prevFilterList);
  };

  #handleModelEvent = () => {
    this.#filter = this.filters;
    this.#renderTripInfo();
    this.#renderfilterList();
  };

  #handleFilterTypeChange = (filterType) => {
    if (this.#headerModel.filter === filterType) {
      return;
    }

    this.#headerModel.setFilter(UpdateType.MAJOR, filterType);
  };
}
