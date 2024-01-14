import { render, RenderPosition } from '../render.js';
import HeaderTopInfo from '../view/header-top-info.js';

export default class HeaderTopInfoPresenter {
  constructor ({headerTripMainElement}) {
    this.headerTripMainElement = headerTripMainElement;
    this.headerTopInfoComponent = new HeaderTopInfo();
  }

  init() {
    render(this.headerTopInfoComponent, this.headerTripMainElement, RenderPosition.AFTERBEGIN);
  }
}
