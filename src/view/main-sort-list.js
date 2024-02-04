import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import { SortingList } from '../utilities/constants.js'

const mainSortListTemplate = (sort) =>
  `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
    ${SortingList.map((item) => `
      <div class="trip-sort__item  trip-sort__item--${item.ID}">
        <input
          id="sort-${item.ID}"
          ${item.DATA_SORT ? `data-sort=${item.DATA_SORT}` : ''}
          class="trip-sort__input  visually-hidden"
          type="radio"
          name="trip-sort"
          value="sort-${item.ID}"
          ${item.DISABLED ? 'disabled' : ''}
          ${item.DATA_SORT === sort ? 'checked' : ''}>
        <label class="trip-sort__btn" for="sort-${item.ID}">${item.TEXT}</label>
      </div>
    `).join('')}
  </form>`;

export default class MainSortList extends AbstractStatefulView {
  #sortHandler = null;
  #sorting = null;
  constructor({ onSort, sorting }) {
    super();
    this.#sortHandler = onSort;
    this.#sorting = sorting;
    this.element.addEventListener('change', this.#chooseSorting);
  }

  #chooseSorting = (evt) => {
    if (evt.target.dataset.sort) {
      this.#sortHandler(evt.target.dataset.sort);
      this.#sorting = evt.target.dataset.sort
    }
  };

  get template() {
    return mainSortListTemplate(this.#sorting);
  }
}
