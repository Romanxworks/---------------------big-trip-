import {render} from '../framework/render.js';
import PointsListView from '../view/points-list-view.js';
import SortListView from '../view/sort-list-view.js';
import ListEmptyView from '../view/list-empty-view.js';
import PointPresenter from './point-presenter.js';
import { updateItem } from '../utils/utils.js';

export default class EventsPresenter{
  #eventsComponent = new PointsListView();
  #sortList = new SortListView();
  #listEmpty = new ListEmptyView();
  #eventsContainer = null;
  #pointModel = null;
  #pointsList  = [];
  #offersList = [];
  #pointPresenter = new Map();

  constructor(eventsContainer, pointModel){
    this.#eventsContainer = eventsContainer;
    this.#pointModel = pointModel;
  }

  init = () => {
    this.#pointsList  = [...this.#pointModel.points];
    this.#offersList = [...this.#pointModel.offers];
    this.#renderPointList();
  };

  #renderPoint = (point) => {
    const pointPresenter = new PointPresenter(this.#eventsComponent.element, this.#handlePointChange, this.#handleModeChange);
    pointPresenter.init(point, this.#offersList);
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
    render(this.#eventsComponent, this.#eventsContainer);
    this.#renderSort();
    this.#renderPoints();
  };

  #renderSort = () => {
    render(this.#sortList, this.#eventsContainer);
  };

  #renderListEmpty = () => {
    render(this.#listEmpty, this.#eventsContainer);
  };

  #clearPointList = () => {
    this.#pointPresenter.forEach((presenter) => presenter.destroy());
    this.#pointPresenter.clear();
  };

  #handlePointChange = (updatedPoint) => {
    this.#pointsList = updateItem(this.#pointsList, updatedPoint);
    this.#pointPresenter.get(updatedPoint.id).init(updatedPoint, this.#offersList);
  };

  #handleModeChange = () => {
    this.#pointPresenter.forEach((presenter) => presenter.resetView());
  };
}
