import {render, replace} from '../framework/render.js';
import PointsListView from '../view/points-list-view.js';
import SortListView from '../view/sort-list-view.js';
import AddEditPointView from '../view/add-edit-point-view.js';
import PointView from '../view/point-view.js';
import ListEmptyView from '../view/list-empty-view.js';

export default class EventsPresenter{
  #eventsComponent = new PointsListView();
  #eventsContainer = null;
  #pointModel = null;
  #pointsList  = [];
  #offersList = [];

  constructor(eventsContainer, pointModel){
    this.#eventsContainer = eventsContainer;
    this.#pointModel = pointModel;
  }

  init = () => {
    this.#pointsList  = [...this.#pointModel.points];
    this.#offersList = [...this.#pointModel.offers];
    this.#renderPointList();
  };

  #renderPoint(point){
    const pointView = new PointView(point, this.#offersList);
    const addEditView = new AddEditPointView(point, this.#offersList);

    const replaceCardToForm = () => replace(addEditView, pointView);

    const replaceFormToCard = () => replace(pointView, addEditView);

    const onEscKeyDown = (evt) => {
      if (evt.key === 'Escape' || evt.key === 'Esc') {
        evt.preventDefault();
        replaceFormToCard();
        document.removeEventListener('keydown', onEscKeyDown);
      }
    };

    pointView.setEditClickHandler(()=>{
      replaceCardToForm();
      document.addEventListener('keydown', onEscKeyDown);
    });

    addEditView.setFormSubmitHandler(()=>{
      replaceFormToCard();
      document.removeEventListener('keydown', onEscKeyDown);
    });

    addEditView.setResetClickHandler(()=>{
      replaceFormToCard();
      document.removeEventListener('keydown', onEscKeyDown);
    });


    render(pointView, this.#eventsComponent.element);
  }

  #renderPointList(){

    if(this.#pointsList.length<1){
      render(new ListEmptyView(), this.#eventsContainer);
      return;
    }

    render(new SortListView(), this.#eventsContainer);
    render(this.#eventsComponent, this.#eventsContainer);

    for (let i = 0; i < this.#pointsList.length; i++) {
      this.#renderPoint(this.#pointsList[i]);
    }

  }
}
