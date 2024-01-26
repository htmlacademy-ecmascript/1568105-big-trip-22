import { render } from '../framework/render.js';
import HeaderFilterList from '../view/header-filter-list.js';
import { FilterType } from '../utilities/constants.js';

export default class HeaderFilterPresenter {
  constructor ({headerTripMainFiltersElement, filterModel}) {
    this.headerTripMainFiltersElement = headerTripMainFiltersElement;
    this.filterModel = filterModel;
    this.headerFilterListComponent = new HeaderFilterList({
      currentFilter: FilterType.EVERYTHING,
      onFilterChange: this.filterModel.setFilter
    });
  }

  init() {
    render(this.headerFilterListComponent, this.headerTripMainFiltersElement);
  }
}
