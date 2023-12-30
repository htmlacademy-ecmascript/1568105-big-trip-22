import { render, RenderPosition } from '../render.js';

import HeaderTopInfo from '../view/header-top-info.js';
import HeaderFilterList from '../view/header-filter-list.js';

const headerTripMainElement = document.querySelector('.trip-main');
const headerTripMainFiltersElement = document.querySelector('.trip-controls__filters');

export default class HeaderPresenter {
  headerTopInfoComponent = new HeaderTopInfo();
  headerFilterListComponent = new HeaderFilterList();

  init() {
    render(this.headerTopInfoComponent, headerTripMainElement, RenderPosition.AFTERBEGIN);
    render(this.headerFilterListComponent, headerTripMainFiltersElement);
  }
}
