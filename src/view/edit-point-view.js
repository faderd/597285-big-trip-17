const DATE_FORMAT = 'YY/MM/DD HH:mm';

import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import {
  formatDate,
} from '../utils/point.js';
import flatpickr from 'flatpickr';

import 'flatpickr/dist/flatpickr.min.css';
import { TYPES } from '../const.js';

const BLANK_POINT = {
  type: 'taxi',
  dateFrom: new Date(),
  dateTo: new Date(),
  offers: [],
  basePrice: 0,
  isFavorite: false,
};

const createOffersTemplate = (offersIds, currentOffers, isDisabled) => currentOffers.offers.map((offer, index) => {
  const checked = offersIds.includes(offer.id);

  return `<div class="event__offer-selector">
    <input class="event__offer-checkbox  visually-hidden" id="event-offer-luggage-${index}" type="checkbox" name="event-offer-luggage" ${checked ? 'checked' : ''} data-offer-id="${offer.id}" ${isDisabled ? 'disabled' : ''}>
    <label class="event__offer-label" for="event-offer-luggage-${index}">
      <span class="event__offer-title">${offer.title}</span>
      &plus;&euro;&nbsp;
      <span class="event__offer-price">${offer.price}</span>
    </label>
  </div>`;
}).join('');

const createPhotosTemplate = (pictures) => `
    <div class="event__photos-container">
    <div class="event__photos-tape">
      ${pictures.map((picture) => `<img class="event__photo" src="${picture.src}" alt="Event photo">`).join('')}
    </div>
`;

const createResetButtonTemplate = (isAddPoint, isDeleting, isDisabled) => {
  if (isAddPoint) {
    return `
    <button class="event__reset-btn" type="reset" ${isDisabled ? 'disabled' : ''}>
      Cancel
    </button>`;
  }

  return `
    <button class="event__reset-btn" type="reset" ${isDisabled ? 'disabled' : ''}>
      ${isDeleting ? 'Deleting...' : 'Delete'}
    </button>`;
};

const getDestinationsTemplate = (destinations) => destinations.map((destination) => `<option value="${destination.name}"></option>`).join('');

const getTypeItemsTemplate = (pointType) => TYPES.map((type) => `
  <div class="event__type-item">
  <input id="event-type-${type}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${type}" ${pointType === type ? 'checked' : ''}>
  <label class="event__type-label  event__type-label--${type}" for="event-type-${type}-1">${type[0].toUpperCase() + type.slice(1)}</label>
</div>`).join('');

const createEditPointTemplate = (point, allOffers, destinations) => {
  const {
    basePrice,
    dateFrom,
    dateTo,
    destination,
    offers,
    type,
    isDeleting,
    isDisabled,
    isSaving,
    isAddPoint,
  } = point;

  const currentOffers = allOffers.find((obj) => obj.type === type);
  const offersTemplate = currentOffers ? createOffersTemplate(offers, currentOffers, isDisabled) : '';
  const isSubmitDisabled = (dateFrom && dateTo === 0);

  return (
    `<li class="trip-events__item">
      <form class="event event--edit" action="#" method="post">
      <header class="event__header">
        <div class="event__type-wrapper">
          <label class="event__type  event__type-btn" for="event-type-toggle-1">
            <span class="visually-hidden">Choose event type</span>
            <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
          </label>
          <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox" ${isDisabled ? 'disabled' : ''}>

          <div class="event__type-list">
            <fieldset class="event__type-group">
              <legend class="visually-hidden">Event type</legend>
              ${getTypeItemsTemplate(type)}
            </fieldset>
          </div>
        </div>

        <div class="event__field-group  event__field-group--destination">
          <label class="event__label  event__type-output" for="event-destination-1">
            ${type}
          </label>
          <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${destination ? destination.name : ''}" list="destination-list-1" required>
          <datalist id="destination-list-1">
            ${getDestinationsTemplate(destinations)}
          </datalist>
        </div>

        <div class="event__field-group  event__field-group--time">
          <label class="visually-hidden" for="event-start-time-1">From</label>
          <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${formatDate(dateFrom, DATE_FORMAT)}" ${isDisabled ? 'disabled' : ''}>
          &mdash;
          <label class="visually-hidden" for="event-end-time-1">To</label>
          <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${formatDate(dateTo, DATE_FORMAT)}" ${isDisabled ? 'disabled' : ''}>
        </div>

        <div class="event__field-group  event__field-group--price">
          <label class="event__label" for="event-price-1">
            <span class="visually-hidden">Price</span>
            &euro;
          </label>
          <input class="event__input  event__input--price" id="event-price-1" type="number" name="event-price" value="${basePrice}" min="1" ${isDisabled ? 'disabled' : ''}>
        </div>

        <button class="event__save-btn  btn  btn--blue" type="submit" ${isSubmitDisabled || isDisabled ? 'disabled' : ''}>
          ${isSaving ? 'Saving...' : 'Save'}
        </button>
        ${createResetButtonTemplate(isAddPoint, isDeleting, isDisabled)}
        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </header>
      <section class="event__details">
        <section class="event__section  event__section--offers" ${currentOffers.offers.length === 0 ? 'style="display: none"' : ''}>
          <h3 class="event__section-title  event__section-title--offers">Offers</h3>

          <div class="event__available-offers">
            ${offersTemplate}
          </div>
        </section>

        <section class="event__section  event__section--destination" ${destination && destination.description ? '' : 'style="display: none"'}>
          <h3 class="event__section-title  event__section-title--destination">Destination</h3>
          <p class="event__destination-description">${destination ? destination.description : ''}</p>
          ${destination && destination.pictures ? createPhotosTemplate(destination.pictures) : ''}
        </section>
      </section>
    </form>
  </li>`);
};

export default class EditPointView extends AbstractStatefulView {
  #allOffers = null;
  #destinations = null;
  #datepickerFrom = null;
  #datepickerTo = null;

  constructor(point = BLANK_POINT, allOffers, destinations) {
    super();
    this._state = EditPointView.parsePointToState(point);
    this.#allOffers = allOffers;
    this.#destinations = destinations;

    this.#setInnerHandlers();
    this.#setDatepickers();
  }

  get template() {
    return createEditPointTemplate(this._state, this.#allOffers, this.#destinations);
  }

  // перегружаем метод родителя removeElement,
  // чтобы при удалении удалялся более не нужный календарь
  removeElement = () => {
    super.removeElement();

    if (this.#datepickerFrom) {
      this.#datepickerFrom.destroy();
      this.#datepickerFrom = null;
    }

    if (this.#datepickerTo) {
      this.#datepickerTo.destroy();
      this.#datepickerTo = null;
    }
  };

  setFormSubmitHandler = (callback) => {
    this._callback.formSubmit = callback;
    this.element.querySelector('form').addEventListener('submit', this.#formSubmitHandler);
  };

  setDeleteClickHandler = (callback) => {
    this._callback.deleteClick = callback;
    this.element.querySelector('.event__reset-btn').addEventListener('click', this.#deleteClickHandler);
  };

  setCloseClickHandler = (callback) => {
    this._callback.closeClick = callback;
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#closeClickHandler);
  };

  reset = (point) => {
    this.updateElement(
      EditPointView.parsePointToState(point),
    );
  };

  _restoreHandlers = () => {
    this.#setInnerHandlers();
    this.#setDatepickers();
    this.setFormSubmitHandler(this._callback.formSubmit);
    this.setDeleteClickHandler(this._callback.deleteClick);
    this.setCloseClickHandler(this._callback.closeClick);
  };

  #formSubmitHandler = (evt) => {
    evt.preventDefault();
    this._callback.formSubmit(EditPointView.parseStateToPoint(this._state));
  };

  #deleteClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.deleteClick(EditPointView.parseStateToPoint(this._state));
  };

  #closeClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.closeClick();
  };

  #typeChangeHandler = (evt) => {
    evt.preventDefault();

    this.updateElement({
      type: evt.target.value,
      offers: [],
    });
  };

  #destinationChangeHandler = (evt) => {
    evt.preventDefault();

    this.updateElement({
      destination: this.#destinations.find((obj) => obj.name === evt.target.value),
    });
  };

  #offerChangeHandler = (evt) => {
    if (evt.target.tagName !== 'INPUT') {
      return;
    }

    if (evt.target.checked) {
      this.updateElement({
        offers: [...this._state.offers, +evt.target.dataset.offerId],
      });
    } else {
      this.updateElement({
        offers: this._state.offers.filter((offerId) => offerId !== +evt.target.dataset.offerId),
      });
    }
  };

  #priceChangeHandler = (evt) => {
    evt.preventDefault();
    this.updateElement({
      basePrice: evt.target.value,
    });
  };

  #setInnerHandlers = () => {
    this.element.querySelector('.event__type-group').addEventListener('change', this.#typeChangeHandler);
    this.element.querySelector('.event__input--destination').addEventListener('change', this.#destinationChangeHandler);
    this.element.querySelector('.event__available-offers').addEventListener('change', this.#offerChangeHandler);
    this.element.querySelector('.event__input--price').addEventListener('change', this.#priceChangeHandler);
  };

  #dateFromChangeHandler = ([userDate]) => {
    this.updateElement({
      dateFrom: userDate,
    });
  };

  #dateToChangeHandler = ([userDate]) => {
    this.updateElement({
      dateTo: userDate,
    });
  };

  #setDatepickers = () => {
    this.#datepickerFrom = flatpickr(
      this.element.querySelector('#event-start-time-1'),
      {
        dateFormat: 'd/m/y H:i',
        enableTime: true,
        defaultDate: this._state.dateFrom,
        onChange: this.#dateFromChangeHandler,
      },
    );

    this.#datepickerTo = flatpickr(
      this.element.querySelector('#event-end-time-1'),
      {
        dateFormat: 'd/m/y H:i',
        enableTime: true,
        defaultDate: this._state.dateTo,
        onChange: this.#dateToChangeHandler,
      },
    );

  };

  static parsePointToState = (point) => ({
    ...point,
    isDisabled: false,
    isSaving: false,
    isDeleting: false,
    isAddPoint: false,
  });

  static parseStateToPoint = (state) => {
    const point = { ...state };

    delete point.isDisabled;
    delete point.isSaving;
    delete point.isDeleting;
    delete point.isAddPoint;

    return point;
  };
}
