import { createElement } from '../render.js';

const pointListTemplate = () => `<ul class="trip-events__list"></ul>`;

class PointListView {
  getTemplate() {
    return pointListTemplate();
  }

  getElement() {
    if(!this.element) {
      this.element = createElement(this.getTemplate());
    }
    return this.element;
  }
}
export default PointListView;
