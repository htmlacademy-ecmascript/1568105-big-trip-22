import AbstractView from '../framework/view/abstract-view.js';
import { humanizeDate } from '../utilities/utilities.js';
import { DATE_FORMAT } from '../utilities/constants.js';

// import dayjs from 'dayjs';

function pointItemTemplate(point, destination, offers) {
  return (
    `<li class="trip-events__item">
      <div class="event">
        <time class="event__date" datetime=${humanizeDate(point.dateFrom, DATE_FORMAT.yearMonthDay)}>${humanizeDate(point.dateFrom, DATE_FORMAT.monthDay)}</time>
        <div class="event__type">
          <img class="event__type-icon" width="42" height="42" src="img/icons/${point.type}.png" alt="Event type icon">
        </div>
        <h3 class="event__title">${point.type} ${destination.name}</h3>
        <div class="event__schedule">
          <p class="event__time">
            <time class="event__start-time" datetime=${humanizeDate(point.dateFrom, DATE_FORMAT.yearMonthDay)}>${humanizeDate(point.dateFrom, DATE_FORMAT.hours)}</time>
            &mdash;
            <time class="event__end-time" datetime=${humanizeDate(point.dateTo, DATE_FORMAT.yearMonthDay)}>${humanizeDate(point.dateTo, DATE_FORMAT.hours)}</time>
          </p>
          <p class="event__duration">30M</p>
        </div>
        <p class="event__price">
          &euro;&nbsp;<span class="event__price-value">${point.basePrice}</span>
        </p>
        <h4 class="visually-hidden">Offers:</h4>
        <ul class="event__selected-offers">
          ${offers.map((item) => `
            <li class="event__offer">
              <span class="event__offer-title">${item.title}</span>
              &plus;&euro;&nbsp;
              <span class="event__offer-price">${item.price}</span>
            </li>
            `).join('')}
        </ul>
        <button class="event__favorite-btn ${point.isFavorite ? 'event__favorite-btn--active' : ''}" type="button">
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
  );
}

export default class PointItem extends AbstractView {
  #onEditClick = null;
  #setFavorite = null;

  constructor({point, offers, destination, onEditClick, setFavorite}) {
    super();
    this.point = point;
    this.offers = offers;
    this.destination = destination;
    this.#onEditClick = onEditClick;
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#rollUpHandler);
    this.element.querySelector('.event__favorite-btn').addEventListener('click', this.#setFavoriteHandler);
    this.#setFavorite = setFavorite;
  }

  get template() {
    return pointItemTemplate(this.point, this.destination, this.offers);
  }

  #rollUpHandler = (evt) => {
    evt.preventDefault();

    this.#onEditClick();
  };

  #setFavoriteHandler = (evt) => {
    evt.preventDefault();

    this.#setFavorite(this.point);
    // console.log('star-click');
  };
}
