import { generatePoint } from '../mock/point.js';
import { getMainOffers } from '../mock/offer.js';
import { setId } from '../utils.js';

export default class PointModel {
  #points = setId(Array.from({length: 20}, generatePoint));
  #offers = getMainOffers();
  get points () { return this.#points; }
  get offers () { return this.#offers; }
}
