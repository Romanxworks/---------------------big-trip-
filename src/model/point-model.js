import { generatePoint } from '../mock/point.js';
import { getMainOffers } from '../mock/offer.js';
import { setId } from '../utils.js';

export default class PointModel {
  points = setId(Array.from({length: 30}, generatePoint));
  offers = getMainOffers();
  getPoints = () => this.points;
  getOffers = () => this.offers;
}
