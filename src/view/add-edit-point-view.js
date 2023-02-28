import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import {formatDate} from '../utils/date.js';
import {addDeleteValue} from '../utils/utils.js';
import {PointFormat, BASE_DESTINATION, BASE_POINT, TYPES, CITIES} from '../const.js';
import flatpickr from 'flatpickr';

import 'flatpickr/dist/flatpickr.min.css';


const createEventTypeElement = (type) => (`<div class="event__type-item">
  <input id="event-type-${type}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${type}">
  <label class="event__type-label  event__type-label--${type}" for="event-type-${type}-1">${type}</label>
</div>`);
const getEventTypeList = TYPES.map(createEventTypeElement).join('');

const getDestinationList = CITIES.map((city) => `<option value="${city}">${city}</option>`).join('');

const createOfferElement = ({id, title, price}, checked) => (`<div class="event__offer-selector">
<input class="event__offer-checkbox  visually-hidden" id="event-offer-${id}-1" type="checkbox" name="event-offer-${id}" ${checked}>
<label class="event__offer-label" for="event-offer-${id}-1">
  <span class="event__offer-title">${title}</span>
  &plus;&euro;&nbsp;
  <span class="event__offer-price">${price}</span>
</label>
</div>`);

const getOfferList = (offersByType, offerIds) => offersByType.map((offer)=>{
  const checked = offerIds && offerIds.includes(offer.id) ? 'checked': '';
  return createOfferElement(offer, checked);}
).join('');

const getPicturesList = (pictures) => pictures.map(({src, description}) => (`<img class="event__photo" src="${src}" alt="${description}">`)).join('');

const createAddEditPointTemplate = (offers, point) =>{
  const {
    basePrice,
    dateFrom,
    dateTo,
    destination: {description, name, pictures},
    offers: offerIds,
    type,
    isNew
  } = point;
  const dateFromFormated = formatDate(dateFrom, PointFormat.DAY);
  const dateToFormated = formatDate(dateTo, PointFormat.DAY);

  const getOffersByType = offers.find((offer) => offer.type === type).offers;

  const isDisabledSubmit = basePrice === '' || name === '';
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

      <button class="event__save-btn  btn  btn--blue" type="submit" ${isDisabledSubmit ? 'disabled' : ''}>Save</button>
      <button class="event__reset-btn" type="reset">${isNew ? 'Cancel' : 'Delete' }</button>
      ${isNew ? '' : `<button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>`}
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

export default class AddEditPointView extends AbstractStatefulView{
  #offers = null;
  #destinations = null;
  #datepicker = null;

  constructor(offers, destinations, point = BASE_POINT) {
    super();
    this._state = AddEditPointView.parsePointToState(point);
    this.#offers = offers;
    this.#destinations = destinations;
    this.#setInnerHandlers();
  }

  get template(){
    return createAddEditPointTemplate(this.#offers, this._state);
  }

  static parsePointToState = (point) => ({...point});

  static parseStateToPoint = (state) => {
    if(state.isNew){
      delete state.isNew;
    }
    return {...state};
  };

  _restoreHandlers = () => {
    this.#setInnerHandlers();
    this.setFormSubmitHandler(this._callback.formSubmit);
    this.setResetClickHandler(this._callback.formReset);
    this.setDeleteClickHandler(this._callback.deleteClick);
  };

  reset = (point) => {
    this.updateElement(
      AddEditPointView.parsePointToState(point),
    );
  };

  setFormSubmitHandler = (callback) => {
    this._callback.formSubmit = callback;
    this.element.querySelector('form').addEventListener('submit', this.#formSubmitHandler);
  };

  setResetClickHandler = (callback) => {
    this._callback.formReset = callback;
    const resetButtonClass = this._state.isNew ? '.event__reset-btn' :'.event__rollup-btn';
    this.element.querySelector(resetButtonClass).addEventListener('click', this.#formResetHandler);
  };

  setDeleteClickHandler = (callback) => {
    this._callback.deleteClick = callback;
    this.element.querySelector('.event__reset-btn').addEventListener('click', this.#deleteClickHandler);
  };

  removeElement = () => {
    super.removeElement();

    if (this.#datepicker) {
      this.#datepicker.destroy();
      this.#datepicker = null;
    }
  };

  #setInnerHandlers = () => {
    this.element.querySelector('.event__type-group').addEventListener('change', this.#typeChangeHandler);
    this.element.querySelector('.event__input--destination').addEventListener('change', this.#nameChangeHandler);
    this.element.querySelector('.event__input--price').addEventListener('change', this.#priceChangeHandler);
    this.element.querySelector('.event__available-offers').addEventListener('change', this.#offerChangeHandler);
    this.#setDatepickerDateFrom();
    this.#setDatepickerDateTo();
  };

  #formSubmitHandler = (evt) => {
    evt.preventDefault();
    this._callback.formSubmit(AddEditPointView.parseStateToPoint(this._state));
  };

  #formResetHandler = (evt) => {
    evt.preventDefault();
    this._callback.formReset();
  };

  #typeChangeHandler = (evt) => {
    evt.preventDefault();
    this.updateElement({
      type: evt.target.value,
    });
  };

  #nameChangeHandler = (evt) => {
    evt.preventDefault();
    const updatedDestination = this.#destinations.find((destination) => destination.name === evt.target.value) || BASE_DESTINATION;
    this.updateElement({
      destination: {...updatedDestination},
    });
  };

  #priceChangeHandler = (evt) => {
    evt.preventDefault();
    this._setState({
      basePrice: evt.target.value,
    });
  };

  #offerChangeHandler = (evt) => {
    const offerId = evt.target.name.slice(evt.target.name.length-1);
    const newOffers = addDeleteValue(offerId, [...this._state.offers]);
    this._setState({
      offers: newOffers,
    });
  };

  #deleteClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.deleteClick(AddEditPointView.parseStateToPoint(this._state));
  };

  #setDatepickerDateFrom = () => {
    this.#datepicker = flatpickr(
      this.element.querySelector('#event-start-time-1'),
      {
        enableTime: true,
        altInput: true,
        altFormat: 'd/m/y H:i',
        dateFormat: 'YYYY-MM-DDTHH:mm:ss.sssZ',
        maxDate: this._state.dateTo,
        defaultDate: this._state.dateFrom,
        onClose: this.#dateFromChangeHandler,
      },
    );
  };

  #dateFromChangeHandler = ([userDateFrom]) => {
    this.updateElement({
      dateFrom: userDateFrom.toISOString(),
    });
  };

  #setDatepickerDateTo = () => {
    this.#datepicker = flatpickr(
      this.element.querySelector('#event-end-time-1'),
      {
        enableTime: true,
        altInput: true,
        altFormat: 'd/m/y H:i',
        dateFormat: 'YYYY-MM-DDTHH:mm:ss.sssZ',
        minDate: this._state.dateFrom,
        defaultDate: this._state.dateTo,
        onClose: this.#dateToChangeHandler,
      },
    );
  };

  #dateToChangeHandler = ([userDateTo]) =>{
    this.updateElement({
      dateTo: userDateTo.toISOString(),
    });
  };

}
