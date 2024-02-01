import AbstractView from '../framework/view/abstract-view.js';
import { UpdateType, FilterType } from '../utilities/constants.js';

const createFilterItemTemplate = (filter, currentFilter) => {
  const {type, count} = filter;
  return (`
  <div class="trip-filters__filter">
    <input
      id="filter-${type}"
      class="trip-filters__filter-input  visually-hidden"
      type="radio"
      name="trip-filter"
      value="${type}"
      ${currentFilter === type ? 'checked' : ''}
      ${!count ? 'disabled' : ''}>
    <label class="trip-filters__filter-label" for="filter-${type}">${type}</label>
  </div>
`);
}

const headerFilterListTemplate = (filters, currentFilter) =>
  `<form class="trip-filters" action="#" method="get">

    ${filters.map((item) => createFilterItemTemplate(item, currentFilter)).join('')}

    <button class="visually-hidden" type="submit">Accept filter</button>
  </form>`;

export default class HeaderFilterList extends AbstractView {
  #currentFilter = null;
  #onFilterChange = null;
  #filters = null;

  constructor({currentFilter, onFilterChange, filters}) {
    super();
    this.#currentFilter = currentFilter;
    this.#onFilterChange = onFilterChange;
    this.#filters = filters;

    this.element.addEventListener('change', this.filterChangeHandler);
  }

  get template() {
    return headerFilterListTemplate(this.#filters, this.#currentFilter);
  }

  filterChangeHandler = (evt) => {
    this.#onFilterChange(UpdateType.MAJOR, evt.target.value);
  };
}
