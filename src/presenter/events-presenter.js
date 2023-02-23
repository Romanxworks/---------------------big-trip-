import {render, remove} from '../framework/render.js';
import PointsListView from '../view/points-list-view.js';
import SortListView from '../view/sort-list-view.js';
import ListEmptyView from '../view/list-empty-view.js';
import PointPresenter from './point-presenter.js';
import {sortByPrice, sortByTime, sortByDay} from '../utils/sort.js';
import {SortType, UserAction, UpdateType} from '../const.js';

export default class EventsPresenter{
  #eventsComponent = new PointsListView();
  #sortList = null;
  #listEmpty = new ListEmptyView();
  #eventsContainer = null;
  #pointModel = null;
  #offersList = [];
  #destinations = [];
  #pointPresenter = new Map();
  #currentSortType = SortType.DAY;

  constructor(eventsContainer, pointModel){
    this.#eventsContainer = eventsContainer;
    this.#pointModel = pointModel;
    this.#pointModel.addObserver(this.#handleModelEvent);
  }

  init = () => {
    this.#offersList = [...this.#pointModel.offers];
    this.#destinations = [...this.#pointModel.destinations];
    this.#renderPointList();
  };

  get points() {
    switch (this.#currentSortType) {
      case SortType.TIME:
        return [...this.#pointModel.points].sort(sortByTime);
      case SortType.PRICE:
        return [...this.#pointModel.points].sort(sortByPrice);
      default:
        return [...this.#pointModel.points].sort(sortByDay);
    }
  }

  #renderPoint = (point) => {
    const pointPresenter = new PointPresenter(this.#eventsComponent.element, this.#handleViewAction, this.#handleModeChange);
    pointPresenter.init(point, this.#offersList, this.#destinations);
    this.#pointPresenter.set(point.id, pointPresenter);
  };

  #renderPoints = (ponts) => {
    ponts.forEach((point)=>this.#renderPoint(point));
  };

  #renderPointList = () => {
    const points = this.points;

    if(points.length < 1){
      this.#renderListEmpty();
      return;
    }

    this.#renderSort();
    this.#renderEventList();
    this.#renderPoints(points);
  };

  #renderSort = () => {
    this.#sortList = new SortListView(this.#currentSortType);
    this.#sortList.setClickSortHandler(this.#handleSortTypeChange);
    render(this.#sortList, this.#eventsContainer);
  };

  #renderListEmpty = () => {
    render(this.#listEmpty, this.#eventsContainer);
  };

  #renderEventList = () => {
    render(this.#eventsComponent, this.#eventsContainer);
  };

  #clearPointList = (resetSortType = false) => {
    this.#pointPresenter.forEach((presenter) => presenter.destroy());
    this.#pointPresenter.clear();
    remove(this.#sortList);
    if (resetSortType) {
      this.#currentSortType = SortType.DAY;
    }
  };

  #handleModeChange = () => {
    this.#pointPresenter.forEach((presenter) => presenter.resetView());
  };

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#currentSortType = sortType;
    this.#clearPointList();
    this.#renderPointList();
  };

  #handleViewAction = (actionType, updateType, update) => {
    switch (actionType){
      case UserAction.ADD_POINT:
        this.#pointModel.addPoint(updateType, update);
        break;
      case UserAction.UPDATE_POINT:
        this.#pointModel.updatePoint(updateType, update);
        break;
      case UserAction.DELETE_POINT:
        this.#pointModel.deletePoint(updateType, update);
        break;
    }
  };

  #handleModelEvent = (updateType, data) => {
    switch (updateType) {
      case UpdateType.PATCH:
        this.#pointPresenter.get(data.id).init(data, this.#offersList);
        break;
      case UpdateType.MINOR:
        this.#clearPointList();
        this.#renderPointList();
        break;
      case UpdateType.MAJOR:
        this.#clearPointList(true);
        this.#renderPointList();
        break;
    }
  };
}
