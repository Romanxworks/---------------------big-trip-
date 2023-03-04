import {render, remove, RenderPosition} from '../framework/render.js';
import AddEditPointView from '../view/add-edit-point-view.js';
import {UserAction, UpdateType} from '../const.js';
import {getCities} from '../utils/utils.js';

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
    const cities = getCities(this.#destinations);
    if (this.#addEditComponent !== null) {
      return;
    }

    this.#addEditComponent = new AddEditPointView(this.#offers, this.#destinations, cities);

    this.#addEditComponent.setFormSubmitHandler(this.#handleFormSubmit);
    this.#addEditComponent.setResetClickHandler(this.#handleDeleteClick);
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

  setSaving = () => {
    this.#addEditComponent.updateElement({
      isDisabled: true,
      isSaving: true,
    });
  };

  setAborting = () => {
    const resetFormState = () => {
      this.#addEditComponent.updateElement({
        isDisabled: false,
        isSaving: false,
        isDeleting: false,
      });
    };

    this.#addEditComponent.shake(resetFormState);
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
      update
    );
    // this.destroy();
  };

  #handleDeleteClick = () => {
    this.destroy();
  };

}
