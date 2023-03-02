import { generatePoint } from '../mock/point.js';
import { getMainOffers } from '../mock/offer.js';
import { getDestinations } from '../mock/destination.js';
import { setId } from '../utils/utils.js';
import Observable from '../framework/observable.js';

export default class PointModel extends Observable{
  #points = setId(Array.from({length: 20}, generatePoint));
  #offers = getMainOffers();
  #destinations = getDestinations();
  get points () { return this.#points; }
  get offers () { return this.#offers; }
  get destinations () { return this.#destinations; }

  updatePoint = (updateType, update) => {
    const index = this.#points.findIndex((point) => point.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t update unexisting point');
    }

    this.#points = [
      ...this.#points.slice(0, index),
      update,
      ...this.#points.slice(index + 1),
    ];

    this._notify(updateType, update);
  };

  addPoint = (updateType, update) => {
    this.#points = [update, ...this.#points];
    this._notify(updateType, update);
  };

  deletePoint = (updateType, update) => {
    this.#points = this.#points.filter((point) => point.id !== update.id);
    this._notify(updateType);
  };
}
