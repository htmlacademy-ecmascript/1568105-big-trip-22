import AbstractView from '../framework/view/abstract-view.js';

const listEmptyTemplate = (message) => `<p class="trip-events__msg">${message}</p>`;

export default class ListEmpty extends AbstractView {
  #message = '';

  constructor(message) {
    super();
    this.#message = message;
  }

  get template() {
    return listEmptyTemplate(this.#message);
  }
}
