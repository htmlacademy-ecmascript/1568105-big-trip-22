import { render, replace, remove } from '../framework/render.js';
import HeaderFilterList from '../view/header-filter-list.js';
import { FilterType } from '../utilities/constants.js';
import { filter } from '../utilities/utilities.js';

export default class HeaderFilterPresenter {
  #headerFilterListComponent = null;
  constructor({ headerTripMainFiltersElement, filterModel, pointModel }) {
    this.headerTripMainFiltersElement = headerTripMainFiltersElement;
    this.filterModel = filterModel;
    this.pointModel = pointModel;

    this.filterModel.addObserver(this.#changeFilterHandle);
    this.pointModel.addObserver(this.#changeFilterHandle);
  }

  get filters() {
    const points = this.pointModel.getPoint();
    return Object.values(FilterType).map((type) => ({
      type,
      count: filter[type](points).length
    }));
  }

  init() {
    const prevFilterComponent = this.#headerFilterListComponent;
    this.#headerFilterListComponent = new HeaderFilterList({
      filters: this.filters,
      currentFilter: this.filterModel.filter,
      onFilterChange: this.filterModel.setFilter
    });

    if (prevFilterComponent === null) {
      render(this.#headerFilterListComponent, this.headerTripMainFiltersElement);
      return;
    }

    replace(this.#headerFilterListComponent, prevFilterComponent);
    remove(prevFilterComponent);
  }

  #changeFilterHandle = () => {
    console.log('asd ', this.filterModel.filter)
    this.init();
  }
}
