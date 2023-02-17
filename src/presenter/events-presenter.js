import {render} from '../framework/render.js';
import PointsListView from '../view/points-list-view.js';
import SortListView from '../view/sort-list-view.js';
import ListEmptyView from '../view/list-empty-view.js';
import PointPresenter from './point-presenter.js';
import {updateItem} from '../utils/utils.js';
import {sortByPrice, sortByTime, sortByDay} from '../utils/sort.js';
import {SortType} from '../const.js';

export default class EventsPresenter{
  #eventsComponent = new PointsListView();
  #sortList = new SortListView();
  #listEmpty = new ListEmptyView();
  #eventsContainer = null;
  #pointModel = null;
  #pointsList  = [];
  #offersList = [];
  #destinations = [];
  #pointPresenter = new Map();
  #currentSortType = SortType.DAY;
  #sourcedPoints = [];

  constructor(eventsContainer, pointModel){
    this.#eventsContainer = eventsContainer;
    this.#pointModel = pointModel;
  }

  init = () => {
    this.#pointsList  = [...this.#pointModel.points].sort(sortByDay);
    this.#offersList = [...this.#pointModel.offers];
    this.#destinations = [...this.#pointModel.destinations];
    this.#sourcedPoints = [...this.#pointModel.points].sort(sortByDay);
    this.#renderPointList();
  };

  #renderPoint = (point) => {
    const pointPresenter = new PointPresenter(this.#eventsComponent.element, this.#handlePointChange, this.#handleModeChange);
    pointPresenter.init(point, this.#offersList, this.#destinations);
    this.#pointPresenter.set(point.id, pointPresenter);
  };

  #renderPoints = () => {
    this.#pointsList.forEach((point)=>this.#renderPoint(point));
  };

  #renderPointList = () => {
    if(this.#pointsList.length<1){
      this.#renderListEmpty();
      return;
    }
    this.#renderSort();
    this.#renderEventList();
    this.#renderPoints();
  };

  #renderSort = () => {
    this.#sortList.setClickSortHandler(this.#handleSortTypeChange);
    render(this.#sortList, this.#eventsContainer);
  };

  #renderListEmpty = () => {
    render(this.#listEmpty, this.#eventsContainer);
  };

  #renderEventList = () => {
    render(this.#eventsComponent, this.#eventsContainer);
  };

  #clearPointList = () => {
    this.#pointPresenter.forEach((presenter) => presenter.destroy());
    this.#pointPresenter.clear();
  };

  #handlePointChange = (updatedPoint) => {
    this.#pointsList = updateItem(this.#pointsList, updatedPoint);
    this.#currentSortType = updateItem(this.#sourcedPoints, updatedPoint);
    this.#pointPresenter.get(updatedPoint.id).init(updatedPoint, this.#offersList);
  };

  #handleModeChange = () => {
    this.#pointPresenter.forEach((presenter) => presenter.resetView());
  };

  #sortPoints = (sortType) => {
    switch (sortType) {
      case SortType.TIME:
        this.#pointsList.sort(sortByTime);
        break;
      case SortType.PRICE:
        this.#pointsList.sort(sortByPrice);
        break;
      default:
        this.#pointsList = [...this.#sourcedPoints];
    }

    this.#currentSortType = sortType;
  };

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#sortPoints(sortType);
    this.#clearPointList();
    this.#renderPoints();

  };
}
