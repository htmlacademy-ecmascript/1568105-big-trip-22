import AbstractView from '../framework/view/abstract-view.js';
import { EmptyListMessage } from '../utilities/constants.js';

const listEmptyTemplate = (message) => (`
  <p class="trip-events__msg">${message}</p>
  `);


export default class ListEmpty extends AbstractView {
  #filter = '';

  constructor(filter) {
    super();
    this.#filter = filter;
  }

  get template() {
    return listEmptyTemplate(this.#filter);
  }
}
