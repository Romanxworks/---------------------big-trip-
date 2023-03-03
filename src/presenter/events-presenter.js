import {render, remove} from '../framework/render.js';
import UiBlocker from '../framework/ui-blocker/ui-blocker.js';
import PointsListView from '../view/points-list-view.js';
import SortListView from '../view/sort-list-view.js';
import ListEmptyView from '../view/list-empty-view.js';
import LoadingView from '../view/loading-view.js';
import PointPresenter from './point-presenter.js';
import {sortByPrice, sortByTime, sortByDay} from '../utils/sort.js';
import {getCities} from '../utils/utils.js';
import {SortType, UserAction, UpdateType, FilterType} from '../const.js';
import {filter} from '../utils/filter.js';
import PointNewPresenter from './point-new-presenter.js';

const TimeLimit = {
  LOWER_LIMIT: 350,
  UPPER_LIMIT: 1000,
};
export default class EventsPresenter{
  #eventsComponent = new PointsListView();
  #sortList = null;
  #listEmpty = null;
  #eventsContainer = null;
  #pointModel = null;
  #headerModel = null;
  #loadingComponent = new LoadingView();
  #pointPresenter = new Map();
  #currentSortType = SortType.DAY;
  #filterType = FilterType.EVERYTHING;
  #pointNewPresenter = null;
  #isLoading = true;
  #uiBlocker = new UiBlocker(TimeLimit.LOWER_LIMIT, TimeLimit.UPPER_LIMIT);

  constructor(eventsContainer, pointModel, headerModel){
    this.#eventsContainer = eventsContainer;
    this.#pointModel = pointModel;
    this.#headerModel = headerModel;
    this.#pointNewPresenter = new PointNewPresenter(this.#eventsComponent.element, this.#handleViewAction);

    this.#pointModel.addObserver(this.#handleModelEvent);
    this.#headerModel.addObserver(this.#handleModelEvent);
  }

  init = () => {
    this.#renderPointList();
  };

  get points() {
    const points = this.#pointModel.points;
    this.#filterType = this.#headerModel.filter;
    const filteredPoints = filter[this.#filterType](points);

    switch (this.#currentSortType) {
      case SortType.TIME:
        return filteredPoints.sort(sortByTime);
      case SortType.PRICE:
        return filteredPoints.sort(sortByPrice);
      default:
        return filteredPoints.sort(sortByDay);
    }
  }

  get offers() {
    return this.#pointModel.offers;
  }

  get destinations() {
    return this.#pointModel.destinations;
  }

  createPoint = (callback) => {
    this.#currentSortType = SortType.DAY;
    this.#headerModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);
    this.#pointNewPresenter.init(this.offers, this.destinations, callback);
  };

  #renderPoint = (point, cities) => {
    const pointPresenter = new PointPresenter(this.#eventsComponent.element, this.#handleViewAction, this.#handleModeChange);
    pointPresenter.init(point, this.offers, this.destinations, cities);
    this.#pointPresenter.set(point.id, pointPresenter);
  };

  #renderPoints = (ponts) => {
    const cities = getCities(this.destinations);
    ponts.forEach((point)=>this.#renderPoint(point, cities));
  };

  #renderPointList = () => {
    if (this.#isLoading) {
      this.#renderLoading();
      return;
    }
    const points = this.points;
    const pointsCount = points.length;

    if(pointsCount === 0){
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
    this.#listEmpty = new ListEmptyView(this.#filterType);
    render(this.#listEmpty, this.#eventsContainer);
  };

  #renderLoading = () => {
    render(this.#loadingComponent, this.#eventsContainer);
  };

  #renderEventList = () => {
    render(this.#eventsComponent, this.#eventsContainer);
  };

  #clearPointList = (resetSortType = false) => {
    this.#pointNewPresenter.destroy();
    this.#pointPresenter.forEach((presenter) => presenter.destroy());
    this.#pointPresenter.clear();
    remove(this.#loadingComponent);
    remove(this.#sortList);

    if (this.#listEmpty) {
      remove(this.#listEmpty);
    }

    if (resetSortType) {
      this.#currentSortType = SortType.DAY;
    }
  };

  #handleModeChange = () => {
    this.#pointNewPresenter.destroy();
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

  #handleViewAction = async (actionType, updateType, update) => {
    this.#uiBlocker.block();
    switch (actionType){
      case UserAction.ADD_POINT:
        this.#pointNewPresenter.setSaving();
        try {
          await this.#pointModel.addPoint(updateType, update);
        } catch(err) {
          this.#pointNewPresenter.setAborting();
        }
        break;
      case UserAction.UPDATE_POINT:
        this.#pointPresenter.get(update.id).setSaving();
        try {
          await this.#pointModel.updatePoint(updateType, update);
        } catch(err) {
          this.#pointPresenter.get(update.id).setAborting();
        }
        break;
      case UserAction.DELETE_POINT:
        this.#pointPresenter.get(update.id).setDeleting();
        try {
          await this.#pointModel.deletePoint(updateType, update);
        } catch(err) {
          this.#pointPresenter.get(update.id).setAborting();
        }
        break;
    }
    this.#uiBlocker.unblock();
  };

  #handleModelEvent = (updateType, data) => {
    switch (updateType) {
      case UpdateType.PATCH:
        this.#pointPresenter.get(data.id).init(data, this.offers);
        break;
      case UpdateType.MINOR:
        this.#clearPointList();
        this.#renderPointList();
        break;
      case UpdateType.MAJOR:
        this.#clearPointList(true);
        this.#renderPointList();
        break;
      case UpdateType.INIT:
        this.#isLoading = false;
        remove(this.#loadingComponent);
        this.#renderPointList();
        break;
    }
  };
}
