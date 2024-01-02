import { render } from '../render.js';
import HeaderFilterList from '../view/header-filter-list.js';

export default class HeaderFilterPresenter {
  constructor ({headerTripMainFiltersElement}) {
    this.headerTripMainFiltersElement = headerTripMainFiltersElement;
    this.headerFilterListComponent = new HeaderFilterList();
  }

  init() {
    render(this.headerFilterListComponent, this.headerTripMainFiltersElement);
  }
}
