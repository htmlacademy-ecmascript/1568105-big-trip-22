import { render, RenderPosition } from '../render.js';
import HeaderTopInfo from '../view/header-top-info.js';

export default class HeaderTopInfoPresenter {
  headerTopInfoComponent = new HeaderTopInfo();

  constructor ({headerTripMainElement}) {
    this.headerTripMainElement = headerTripMainElement;
  }

  init() {
    render(this.headerTopInfoComponent, this.headerTripMainElement, RenderPosition.AFTERBEGIN);
  }
}
