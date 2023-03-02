import AbstractView from '../framework/view/abstract-view.js';
import {formatDate, getDifferentDate} from '../utils/date.js';
import {PointFormat} from '../const';

const createPointTemplate = (offers, point) =>{
  const {basePrice, dateFrom, dateTo, destination, offers: offerIds, isFavorite, type} = point;
  const diffTime = getDifferentDate(dateTo, dateFrom);
  const getOffersByType = offers.find((offer) => offer.type === type).offers;
  const createOfferTemplate = (offer) => {
    const {title, price} = offer;
    if(offerIds.includes(offer.id)){
      return(`<li class="event__offer">
    <span class="event__offer-title">${title}</span>
    &plus;&euro;&nbsp;
    <span class="event__offer-price">${price}</span>
  </li>`);}
  };
  const getOffersList = offerIds.length ? getOffersByType.map(createOfferTemplate).join(''): '';
  return (
    `<li class="trip-events__item">
  <div class="event">
    <time class="event__date" datetime="2019-03-18">${formatDate(dateFrom, PointFormat.MONTH)}</time>
    <div class="event__type">
      <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type icon">
    </div>
    <h3 class="event__title">${type} ${destination.name}</h3>
    <div class="event__schedule">
      <p class="event__time">
        <time class="event__start-time" datetime="2019-03-18T10:30">${formatDate(dateFrom, PointFormat.HOUR)}</time>
        &mdash;
        <time class="event__end-time" datetime="2019-03-18T11:00">${formatDate(dateTo, PointFormat.HOUR)}</time>
      </p>
      <p class="event__duration">${diffTime}</p>
    </div>
    <p class="event__price">
      &euro;&nbsp;<span class="event__price-value">${basePrice}</span>
    </p>
    <h4 class="visually-hidden">Offers:</h4>
    <ul class="event__selected-offers">
      ${getOffersList}
    </ul>
    <button class="event__favorite-btn event__favorite-btn${isFavorite ? '--active': ''}" type="button">
      <span class="visually-hidden">Add to favorite</span>
      <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
        <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
      </svg>
    </button>
    <button class="event__rollup-btn" type="button">
      <span class="visually-hidden">Open event</span>
    </button>
  </div>
</li>`
  );};

export default class PointView extends AbstractView{
  #point = null;
  #offers = null;

  constructor(point, offers) {
    super();
    this.#point = point;
    this.#offers = offers;
  }

  get template(){
    return createPointTemplate(this.#offers, this.#point);
  }

  setEditClickHandler = (callback) => {
    this._callback.editClick = callback;
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#editClickHandler);
  };

  setFavoriteClickHandler = (callback) => {
    this._callback.clickFavorite = callback;
    this.element.querySelector('.event__favorite-btn').addEventListener('click', this.#clickFavoriteHandler);
  };

  #editClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.editClick();
  };

  #clickFavoriteHandler = (evt) => {
    evt.preventDefault();
    this._callback.clickFavorite();
  };

}
