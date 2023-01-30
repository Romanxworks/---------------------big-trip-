import {render} from '../render.js';
import PointsListView from '../view/points-list-view.js';
import SortListView from '../view/sort-list-view.js';
import AddDeletePointView from '../view/add-delete-point-view.js';
import PointView from '../view/point-view.js';
export default class EventsPresenter{
  eventsComponent = new PointsListView();

  init = (eventsContainer) => {
    this.eventsContainer = eventsContainer;
    render(new SortListView(), this.eventsContainer);
    render(this.eventsComponent, this.eventsContainer);
    render(new AddDeletePointView, this.eventsComponent.getElement());

    for (let i = 0; i < 3; i++) {
      render(new PointView, this.eventsComponent.getElement());
    }
  };
}
