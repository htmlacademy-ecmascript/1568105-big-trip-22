import { render, remove, RenderPosition } from '../framework/render.js';
import HeaderTopInfo from '../view/header-top-info.js';

export default class HeaderTopInfoPresenter {
  #headerTopInfoComponent = null;
  constructor({ headerTripMainElement }) {
    this.headerTripMainElement = headerTripMainElement;
  }

  init({ model, points }) {
    if (this.#headerTopInfoComponent) {
      remove(this.#headerTopInfoComponent);
    }
    if (points.length) {
      this.#headerTopInfoComponent = new HeaderTopInfo({ model, points });
      render(this.#headerTopInfoComponent, this.headerTripMainElement, RenderPosition.AFTERBEGIN);
    }
  }

}
