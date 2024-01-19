import { render, RenderPosition } from '../framework/render.js';
import HeaderTopInfo from '../view/header-top-info.js';

export default class HeaderTopInfoPresenter {
  constructor ({headerTripMainElement}) {
    this.headerTripMainElement = headerTripMainElement;
  }

  init({pointModel}) {
    this.headerTopInfoComponent = new HeaderTopInfo(pointModel);
    render(this.headerTopInfoComponent, this.headerTripMainElement, RenderPosition.AFTERBEGIN);
  }
}
