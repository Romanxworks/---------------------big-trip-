import {render, replace, remove} from '../framework/render.js';
import PointView from '../view/point-view.js';
import AddEditPointView from '../view/add-edit-point-view.js';
import {Mode} from '../const.js';

export default class PointPresenter {
  #ponitListContainer = null;
  #pointComponent = null;
  #addEditComponent = null;
  #changeData = null;
  #changeMode = null;

  #point = null;
  #offers = null;
  #mode = Mode.DEFAULT;

  constructor(ponitListContainer, changeData, changeMode){
    this.#ponitListContainer = ponitListContainer;
    this.#changeData = changeData;
    this.#changeMode = changeMode;
  }

  init = (point, offers) => {
    this.#point = point;
    this.#offers = offers;

    const prevPointComponent = this.#pointComponent;
    const prevAddEditComponent = this.#addEditComponent;

    this.#pointComponent = new PointView(this.#point, this.#offers);
    this.#addEditComponent = new AddEditPointView(this.#point, this.#offers);

    this.#pointComponent.setEditClickHandler(this.#handleEditClick);
    this.#pointComponent.setFavoriteClickHandler(this.#handleFavoriteClick);
    this.#addEditComponent.setFormSubmitHandler(this.#handleFormSubmit);
    this.#addEditComponent.setResetClickHandler(this.#handleResetClickHandler);

    if (prevPointComponent === null || prevAddEditComponent === null) {
      render(this.#pointComponent, this.#ponitListContainer);
      return;
    }

    if (this.#mode === Mode.DEFAULT) {
      replace(this.#pointComponent, prevPointComponent);
    }

    if (this.#mode === Mode.EDITING) {
      replace(this.#addEditComponent, prevAddEditComponent);
    }

    remove(prevPointComponent);
    remove(prevAddEditComponent);

  };

  destroy = () => {
    remove(this.#pointComponent);
    remove(this.#addEditComponent);
  };

  resetView = () => {
    if (this.#mode !== Mode.DEFAULT) {
      this.#replaceFormToCard();
    }
  };

  #replaceCardToForm = () => {
    replace(this.#addEditComponent, this.#pointComponent);
    document.addEventListener('keydown', this.#escKeyDownHandler);
    this.#changeMode();
    this.#mode = Mode.EDITING;
  };

  #replaceFormToCard = () => {
    replace(this.#pointComponent, this.#addEditComponent);
    document.removeEventListener('keydown', this.#escKeyDownHandler);
    this.#mode = Mode.DEFAULT;
  };

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.#replaceFormToCard();
    }
  };

  #handleEditClick = () => {
    this.#replaceCardToForm();
  };

  #handleFormSubmit = (point) => {
    this.#changeData(point);
    this.#replaceFormToCard();
  };

  #handleResetClickHandler = () => {
    this.#replaceFormToCard();
  };

  #handleFavoriteClick = () => {
    this.#changeData({...this.#point, isFavorite: !this.#point.isFavorite});
  };

}
