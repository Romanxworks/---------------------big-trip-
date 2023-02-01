import {render} from '../render.js';
import PointsListView from '../view/points-list-view.js';
import SortListView from '../view/sort-list-view.js';
import AddDeletePointView from '../view/add-delete-point-view.js';
import PointView from '../view/point-view.js';
export default class EventsPresenter{
  eventsComponent = new PointsListView();

  init = (eventsContainer, pointModel) => {
    this.eventsContainer = eventsContainer;
    this.pointModel = pointModel;
    this.pointsList  = [...this.pointModel.getPoints()];
    this.offersList = [...this.pointModel.getOffers()];

    render(new SortListView(), this.eventsContainer);
    render(this.eventsComponent, this.eventsContainer);
    render(new AddDeletePointView, this.eventsComponent.getElement());

    for (let i = 0; i < this.pointsList.length; i++) {
      render(
        new PointView(this.pointsList[i], this.offersList),
        this.eventsComponent.getElement()
      );
    }
  };
}
