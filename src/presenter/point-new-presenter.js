import {render, remove, RenderPosition} from '../framework/render.js';
import AddEditPointView from '../view/add-edit-point-view.js';
import {UserAction, UpdateType} from '../const.js';
import {getRandomInteger} from '../utils/utils.js';

export default class PointNewPresenter {
  #ponitListContainer = null;
  #addEditComponent = null;
  #changeData = null;
  #offers = null;
  #destinations = null;
  #destroyCallback = null;

  constructor(ponitListContainer, changeData){
    this.#ponitListContainer = ponitListContainer;
    this.#changeData = changeData;
  }

  init = (offers, destinations, callback) => {
    this.#destroyCallback = callback;
    this.#offers = offers;
    this.#destinations = destinations;

    if (this.#addEditComponent !== null) {
      return;
    }

    this.#addEditComponent = new AddEditPointView(this.#offers, this.#destinations);

    this.#addEditComponent.setFormSubmitHandler(this.#handleFormSubmit);
    this.#addEditComponent.setDeleteClickHandler(this.#handleDeleteClick);
    render(this.#addEditComponent, this.#ponitListContainer, RenderPosition.AFTERBEGIN);

    document.addEventListener('keydown', this.#escKeyDownHandler);
  };

  destroy = () => {
    if (this.#addEditComponent === null) {
      return;
    }

    this.#destroyCallback?.();

    remove(this.#addEditComponent);
    this.#addEditComponent = null;

    document.removeEventListener('keydown', this.#escKeyDownHandler);

  };

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.destroy();
    }
  };

  #handleFormSubmit = (update) => {
    this.#changeData(
      UserAction.ADD_POINT,
      UpdateType.MINOR,
      {id:getRandomInteger(50, 5000),...update}
    );
    this.destroy();
  };

  #handleDeleteClick = () => {
    this.destroy();
  };

}
