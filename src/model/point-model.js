import Observable from '../framework/observable.js';
import {UpdateType} from '../const.js';
export default class PointModel extends Observable{
  #points = [];
  #offers = [];
  #destinations = [];
  #eventApiService = null;

  constructor(eventApiService){
    super();
    this.#eventApiService = eventApiService;
  }

  init = async () => {
    try{
      const points = await this.#eventApiService.points;
      this.#points = points.map(this.#adaptToClient);
      this.#offers = await this.#eventApiService.offers;
      this.#destinations = await this.#eventApiService.destinations;
    } catch(error){
      this.#points = [];
      this.#offers = [];
      this.#destinations = [];
    }

    this._notify(UpdateType.INIT);
  };

  get points () { return this.#points; }
  get offers () { return this.#offers; }
  get destinations () { return this.#destinations; }

  updatePoint = async (updateType, update) => {
    const index = this.#points.findIndex((point) => point.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t update unexisting point');
    }
    try {
      const responce = await this.#eventApiService.updatePoint(update);
      const apdetedPoint = this.#adaptToClient(responce);
      this.#points = [
        ...this.#points.slice(0, index),
        apdetedPoint,
        ...this.#points.slice(index + 1),
      ];
      this._notify(updateType, apdetedPoint);
    } catch (error) {
      throw new Error('Can\'t update point');
    }


    this._notify(updateType, update);
  };

  addPoint = async (updateType, update) => {
    try {
      const responce = await this.#eventApiService.addPoint(update);
      const newPoint = this.#adaptToClient(responce);
      this.#points = [newPoint, ...this.#points];
      this._notify(updateType, update);
    } catch (error) {
      throw new Error('Can\'t add point');
    }

  };

  deletePoint = async (updateType, update) => {
    const index = this.#points.findIndex((point) => point.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t update unexisting point');
    }

    try {
      await this.#eventApiService.deletePoint(update);
      this.#points = this.#points.filter((point) => point.id !== update.id);
      this._notify(updateType);
    } catch (error) {
      throw new Error('Can\'t delete point');
    }

  };

  #adaptToClient = (point) => {
    const adaptedPoint = {...point,
      basePrice: point['base_price'],
      dateFrom: point['date_from'],
      dateTo: point['date_to'],
      isFavorite: point['is_favorite'],
    };

    delete adaptedPoint['base_price'];
    delete adaptedPoint['date_from'];
    delete adaptedPoint['date_to'];
    delete adaptedPoint['is_favorite'];

    return adaptedPoint;
  };
}
