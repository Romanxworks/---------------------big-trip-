import AbstractView from '../framework/view/abstract-view.js';
import {TYPES, CITIES} from '../const.js';
import {formatDate, getRandomDay} from '../utils/date.js';
import {PointFormat} from '../const.js';

const createEventTypeElement = (type) => (`<div class="event__type-item">
  <input id="event-type-${type}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${type}">
  <label class="event__type-label  event__type-label--${type}" for="event-type-${type}-1">${type}</label>
</div>`);
const getEventTypeList = TYPES.map(createEventTypeElement).join('');

const createDestinationItems = (city) => `<option value="${city}">${city}</option>`;
const getDestinationList = CITIES.map(createDestinationItems).join('');

const createOfferElement = ({id, title, price}, checked) => (`<div class="event__offer-selector">
<input class="event__offer-checkbox  visually-hidden" id="event-offer-${id}-1" type="checkbox" name="event-offer-${id}" ${checked}>
<label class="event__offer-label" for="event-offer-${id}-1">
  <span class="event__offer-title">${title}</span>
  &plus;&euro;&nbsp;
  <span class="event__offer-price">${price}</span>
</label>
</div>`);
const getOfferList = (offersByType, offerIds) => offersByType.map((offer)=>{
  const checked = offerIds.includes(offer.id) ? 'checked': '';
  return createOfferElement(offer, checked);}
).join('');

const createPictureElement = ({src, description}) => (`<img class="event__photo" src="${src}" alt="${description}">`);
const getPicturesList = (pictures) => pictures.map((picture)=>createPictureElement(picture)).join('');

const BASE_POINT = {
  basePrice:'100',
  dateFrom: getRandomDay().dateFrom,
  dateTo: getRandomDay().dateTo,
  destination: {
    description: '',
    name: '',
    pictures: []
  },
  type: 'taxi'
};
const createAddEditPointTemplate = (offers, point) =>{
  const {
    basePrice,
    dateFrom,
    dateTo,
    destination: {description, name, pictures},
    offers: offerIds,
    type
  } = point;
  const dateFromFormated = formatDate(dateFrom, PointFormat.DAY);
  const dateToFormated = formatDate(dateTo, PointFormat.DAY);

  const getOffersByType = offers.find((offer) => offer.type === type).offers;


  return (
    `<li class="trip-events__item">
  <form class="event event--edit" action="#" method="post">
    <header class="event__header">
      <div class="event__type-wrapper">
        <label class="event__type  event__type-btn" for="event-type-toggle-1">
          <span class="visually-hidden">Choose event type</span>
          <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
        </label>
        <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

        <div class="event__type-list">
          <fieldset class="event__type-group">
            <legend class="visually-hidden">Event type</legend>
              ${getEventTypeList}
          </fieldset>
        </div>
      </div>

      <div class="event__field-group  event__field-group--destination">
        <label class="event__label  event__type-output" for="event-destination-1">
          ${type}
        </label>
        <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${name}" list="destination-list-1">
        <datalist id="destination-list-1">
          ${getDestinationList}
        </datalist>
      </div>

      <div class="event__field-group  event__field-group--time">
        <label class="visually-hidden" for="event-start-time-1">From</label>
        <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${dateFromFormated}">
        &mdash;
        <label class="visually-hidden" for="event-end-time-1">To</label>
        <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${dateToFormated}">
      </div>

      <div class="event__field-group  event__field-group--price">
        <label class="event__label" for="event-price-1">
          <span class="visually-hidden">Price</span>
          &euro;
        </label>
        <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${basePrice}">
      </div>

      <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
      <button class="event__reset-btn" type="reset">Cancel</button>
    </header>
    <section class="event__details">
      <section class="event__section  event__section--offers">
        <h3 class="event__section-title  event__section-title--offers">Offers</h3>

        <div class="event__available-offers">
          ${getOfferList(getOffersByType, offerIds)}
        </div>
      </section>
    ${ name === '' ? '' : (`<section class="event__section  event__section--destination">
        <h3 class="event__section-title  event__section-title--destination">Destination</h3>
        <p class="event__destination-description">${description}</p>

        <div class="event__photos-container">
          <div class="event__photos-tape">
          ${pictures? getPicturesList(pictures): ''}
          </div>
        </div>
      </section>`)
    }
    </section>
  </form>
</li>`
  );};

export default class AddEditPointView extends AbstractView{
  #point = null;
  #offers = null;

  constructor(point = BASE_POINT, offers) {
    super();
    this.#point = point;
    this.#offers = offers;
  }

  get template(){
    return createAddEditPointTemplate(this.#offers, this.#point);
  }

  setFormSubmitHandler = (callback) => {
    this._callback.formSubmit = callback;
    this.element.querySelector('form').addEventListener('submit', this.#formSubmitHandler);
  };

  setResetClickHandler = (callback) => {
    this._callback.formReset = callback;
    this.element.querySelector('.event__reset-btn').addEventListener('click', this.#formResetHandler);
  };

  #formSubmitHandler = (evt) => {
    evt.preventDefault();
    this._callback.formSubmit();
  };

  #formResetHandler = (evt) => {
    evt.preventDefault();
    this._callback.formReset();
  };

}
