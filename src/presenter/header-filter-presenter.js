import { render } from '../render.js';
import HeaderFilterList from '../view/header-filter-list.js';

export default class HeaderFilterPresenter {
  headerFilterListComponent = new HeaderFilterList();

  constructor ({headerTripMainFiltersElement}) {
    this.headerTripMainFiltersElement = headerTripMainFiltersElement;
  }

  init() {
    render(this.headerFilterListComponent, this.headerTripMainFiltersElement);
  }
}
