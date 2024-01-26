import AbstractView from '../framework/view/abstract-view.js';
import { UpdateType, FilterType } from '../utilities/constants.js';

const createFilterItemTemplate = (filter, currentFilter) => (`
  <div class="trip-filters__filter">
    <input
      id="filter-${filter}"
      class="trip-filters__filter-input  visually-hidden"
      type="radio"
      name="trip-filter"
      value="${filter}"
      ${currentFilter === filter ? 'checked' : ''}>
    <label class="trip-filters__filter-label" for="filter-${filter}">${filter}</label>
  </div>
`);

const headerFilterListTemplate = (filters, currentFilter) =>
  `<form class="trip-filters" action="#" method="get">

    ${filters.map((item) => createFilterItemTemplate(item, currentFilter)).join('')}

    <button class="visually-hidden" type="submit">Accept filter</button>
  </form>`;

export default class HeaderFilterList extends AbstractView {
  #currentFilter = null;
  #onFilterChange = null;

  constructor({currentFilter, onFilterChange}) {
    super();
    this.#currentFilter = currentFilter;
    this.#onFilterChange = onFilterChange;

    this.element.addEventListener('change', this.filterChangeHandler);
  }

  get template() {
    return headerFilterListTemplate(Object.values(FilterType), this.#currentFilter);
  }

  filterChangeHandler = (evt) => {
    this.#onFilterChange(UpdateType.MAJOR, evt.target.value);
  };
}
