import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { humanizeDate } from '../utilities/utilities.js';
import { DATE_FORMAT, MUTUAL_CONFIG } from '../utilities/constants.js';

const pointEditTemplate = ({ state, model, isNewPoint }) =>
  `<li class="trip-events__item">
    <form class="event event--edit" action="#" method="post">
      <header class="event__header">
        <div class="event__type-wrapper">
          <label class="event__type  event__type-btn" for="event-type-toggle-1">
            <span class="visually-hidden">Choose event type</span>
            ${state.point.type ? `<img class="event__type-icon" width="17" height="17" src="img/icons/${state.point.type}.png" alt="Event type icon">` : ''}
          </label>
          <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

          <div class="event__type-list">
            <fieldset class="event__type-group">
              <legend class="visually-hidden">Event type</legend>
              ${model.getOffers().map((item) => `
                <div class="event__type-item">
                  <input
                    id="event-type-${item.type}-1"
                    class="event__type-input  visually-hidden"
                    type="radio" name="event-type"
                    ${state.point.type === item.type ? 'checked' : ''}
                    value=${item.type}>
                  <label class="event__type-label  event__type-label--${item.type}" for="event-type-${item.type}-1">${item.type}</label>
                </div>`).join('')}
            </fieldset>
          </div>
        </div>

        <div class="event__field-group  event__field-group--destination">
          <label class="event__label  event__type-output" for="event-destination-${state.point.id || '0'}">
            ${state.point.type}
          </label>
          <input
            class="event__input  event__input--destination"
            id="event-destination-${state.point.id || '0'}"
            type="text" name="event-destination"
            value="${state.point.destination ? model.getDestinationById(state.point.destination).name : ''}"
            list="destination-list-1" required>
          <datalist id="destination-list-1">
            ${model.getDestinations().length ? model.getDestinations().map((item) => `<option value="${item.name}"></option>`).join('') : ''}
          </datalist>
        </div>

        <div class="event__field-group  event__field-group--time">
          <label class="visually-hidden" for="event-start-time-1">From</label>
          <input
            class="event__input  event__input--time"
            id="event-start-time-1"
            type="text" name="event-start-time"
            value="${humanizeDate(state.point.dateFrom, DATE_FORMAT.date)}" required>
          &mdash;
          <label class="visually-hidden" for="event-end-time-1">To</label>
          <input
            class="event__input  event__input--time"
            id="event-end-time-1"
            type="text" name="event-end-time"
            value="${humanizeDate(state.point.dateTo, DATE_FORMAT.date)}" required>
        </div>

        <div class="event__field-group  event__field-group--price">
          <label class="event__label" for="event-price-1">
            <span class="visually-hidden">Price</span>
            &euro;
          </label>
          <input class="event__input  event__input--price" id="event-price-1" type="number" min="1" name="event-price" value=${state.point.basePrice} required>
        </div>

        <button
          class="event__save-btn  btn  btn--blue"
          type="submit" ${state.isDisabled ? 'disabled' : ''}
        >${state.isSaving ? 'Saving...' : 'Save'}</button>
        ${isNewPoint ? '<button class="event__reset-btn" type="reset">Cancel</button>' : `<button class="event__reset-btn" type="reset" ${state.isDisabled ? 'disabled' : ''}>${state.isDeleting ? 'Deleting...' : 'Delete'}</button>`}
        ${!isNewPoint ?
    `<button class="event__rollup-btn" type="button">
      <span class="visually-hidden">Open event</span>
    </button>`
    : ''
}
      </header>
      ${state.point.destination || model.getDestinationById(state.point.destination)?.pictures.length || model.getOfferByType(state.point.type).offers ?
    `<section class="event__details">
      ${model.getOfferByType(state.point.type).offers.length > 0 ?
    `<section class="event__section  event__section--offers">
          <h3 class="event__section-title  event__section-title--offers">Offers</h3>
          <div class="event__available-offers">
            ${state.point.type ? model.getOfferByType(state.point.type).offers.map((offer) => `
              <div class="event__offer-selector">
                <input
                  class="event__offer-checkbox  visually-hidden"
                  id=${offer.id} type="checkbox" name=${offer.id}
                  ${state.point.offers.includes(offer.id) ? 'checked' : ''}>
                <label class="event__offer-label" for=${offer.id}>
                  <span class="event__offer-title">${offer.title}</span>
                  &plus;&euro;&nbsp;
                  <span class="event__offer-price">${offer.price}</span>
                </label>
              </div>`).join('') : ''}
          </div>
        </section>` : ''}
        ${state.point.destination ? (model.getDestinationById(state.point.destination).description || model.getDestinationById(state.point.destination)?.pictures.length ?
    `<section class="event__section  event__section--destination">
      <h3 class="event__section-title  event__section-title--destination">Destination</h3>
      <p class="event__destination-description">${state.point.destination ? model.getDestinationById(state.point.destination).description : ''}</p>
      ${model.getDestinationById(state.point.destination)?.pictures.length ?
      `<div class="event__photos-container">
        <div class="event__photos-tape">
          ${model.getDestinationById(state.point.destination)?.pictures.map((item) => `
            <img class="event__photo" src="${item.src}" alt="${item.description}">`).join('')}
        </div>
      </div>` : ''}
        </section>` : '') : ''}
      </section>` : '' }
    </form>
  </li>`;

export default class EditPoint extends AbstractStatefulView {
  #onSubmit = null;
  #model = null;
  #datepickerFrom = null;
  #datepickerTo = null;
  #onDelete = null;
  #onRollUpClick = null;
  #isNewPoint = false;

  constructor({ point, model, onSubmit, onDelete, onRollUpClick, isNewPoint }) {
    super();
    this.point = point;
    this.#model = model;
    this.#onSubmit = onSubmit;
    this.#onDelete = onDelete;
    this.#onRollUpClick = onRollUpClick;
    this.#isNewPoint = isNewPoint;

    this._setState(EditPoint.parsePointToState(point));
    this._restoreHandlers();
  }

  static parsePointToState = (point) => ({
    point: { ...point },
    isSaving: false,
    isDeleting: false,
    isDisabled: false
  });

  static parseStateToPoint = (state) => {
    const point = { ...state };
    delete point.isDisabled;
    delete point.isSaving;
    delete point.isDeleting;

    return point;
  };

  _restoreHandlers() {
    this.element.querySelector('.event').addEventListener('submit', this.#submitHandler);
    this.element.querySelector('.event__type-group').addEventListener('change', this.#chooseTypeHandler);

    if (this.element.querySelector('.event__available-offers')) {
      this.element.querySelector('.event__available-offers').addEventListener('change', this.#checkOffersHandler);
    }

    this.element.querySelector('.event__input--price').addEventListener('input', this.#changePriceHandler);
    this.element.querySelector('.event__input--destination').addEventListener('change', this.#chooseDestinationHandler);
    this.element.querySelector('.event__reset-btn').addEventListener('click', this.#deleteButtonHandler);

    if (this.element.querySelector('.event__rollup-btn')) {
      this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#rollUpButtonHandler);
    }

    this.#setDatePicker();
  }

  removeElement() {
    super.removeElement();

    if (this.#datepickerFrom) {
      this.#datepickerFrom.destroy();
      this.#datepickerFrom = null;
    }

    if (this.#datepickerTo) {
      this.#datepickerTo.destroy();
      this.#datepickerTo = null;
    }
  }

  #rollUpButtonHandler = () => {
    this.#onRollUpClick();
  };

  #deleteButtonHandler = (evt) => {
    evt.preventDefault();
    this.#onDelete(this._state.point);
  };

  #chooseDestinationHandler = (evt) => {
    this.updateElement({
      point: {
        ...this._state.point,
        destination: evt.target.value ? this.#model.getDestinationByName(evt.target.value).id : ''
      }
    });
  };

  #changePriceHandler = (evt) => {
    this._setState({
      point: {
        ...this._state.point,
        basePrice: evt.target.value * 1
      }
    });
  };

  #checkOffersHandler = () => {
    const checkedOffers = Array.from(document.querySelectorAll('.event__offer-checkbox'))
      .filter((item) => item.checked)
      .map((item) => item.id);
    this._setState({
      point: {
        ...this._state.point,
        offers: [...checkedOffers]
      }
    });
  };

  #chooseTypeHandler = (evt) => {
    this.updateElement({
      point: {
        ...this._state.point,
        type: evt.target.value,
        offers: []
      }
    });
  };

  #setDatePicker = () => {
    this.#datepickerFrom = flatpickr(this.element.querySelector('#event-start-time-1'), {
      ...MUTUAL_CONFIG,
      maxDate: this._state.point.dateTo,
      defaultDate: this._state.point.dateFrom,
      onChange: this.#dateFromChangeHandler
    });

    this.#datepickerTo = flatpickr(this.element.querySelector('#event-end-time-1'), {
      ...MUTUAL_CONFIG,
      minDate: this._state.point.dateFrom,
      defaultDate: this._state.point.dateTo,
      onChange: this.#dateToChangeHandler
    });
  };

  #dateFromChangeHandler = ([userDate]) => {
    this._setState({
      point: {
        ...this._state.point,
        dateFrom: userDate.toISOString()
      }
    });

  };

  #dateToChangeHandler = ([userDate]) => {
    this._setState({
      point: {
        ...this._state.point,
        dateTo: userDate.toISOString()
      }
    });
  };

  get template() {
    return pointEditTemplate({
      state: this._state,
      model: this.#model,
      isNewPoint: this.#isNewPoint
    });
  }

  #submitHandler = (evt) => {
    evt.preventDefault();

    this.#onSubmit(this._state.point);
  };
}
