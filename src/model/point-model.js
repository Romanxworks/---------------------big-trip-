import { generatePoint } from '../mock/point.js';
import { getMainOffers } from '../mock/offer.js';
import { getDestinations } from '../mock/destination.js';
import { setId } from '../utils/utils.js';

export default class PointModel {
  #points = setId(Array.from({length: 20}, generatePoint));
  #offers = getMainOffers();
  #destinations = getDestinations();
  get points () { return this.#points; }
  get offers () { return this.#offers; }
  get destinations () { return this.#destinations; }
}
