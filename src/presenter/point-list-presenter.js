import PointPresenter from './point-presenter.js';

export default class PointListPresenter {
  #pointModel = null;
  #sort = 'DEFAULT';
  #filter = null;
  #container = null;
  #data = null;

  #pointPresentersList = new Map();


  constructor({ container }) {
    this.#container = container;
  }

  init({ sort, filter, pointModel }) {
    this.#pointModel = pointModel;
    this.#sort = sort;
    this.#filter = filter;
    // console.log(this.#data)
    this.#data = this.#sorting([...this.#pointModel.getPoint()]);
    // console.log(this.#data)
    //sorting
    //filtering

    this.#renderPointsList();
  }

  #sorting(points) {
    // console.log(this.#sort)
    switch (this.#sort) {
      case 'DEFAULT':
        return points.sort((a, b) => new Date(a.dateFrom) - new Date(b.dateFrom));
      case 'PRICE':
        return points.sort((b, a) => a.basePrice - b.basePrice);
      case 'TIME':
        return points.sort((a, b) => ((new Date(a.dateTo) - new Date(a.dateFrom)) - (new Date(b.dateTo) - new Date(b.dateFrom))));
    }
  }

  #renderPointsList() {
    this.#clearPoints();
    for (let i = 0; i < this.#data.length; i++) {
      this.#renderPoint((this.#data[i]));
    }
  }

  #clearPoints = () => {
    this.#pointPresentersList.forEach((item) => {
      item.delete();
    });
  };

  #renderPoint(pointData) {
    const pointPresenterComponent = new PointPresenter({
      container: this.#container.element,
      pointModel: this.#pointModel,
      changeModeToEdit: this.#changeModeHandler,
      setFavorite: this.#setFavorite
    });

    this.#pointPresentersList.set(pointData.id, pointPresenterComponent);
    pointPresenterComponent.init(pointData);
  }

  #setFavorite = (point) => {
    const updatedPointId = this.#data.findIndex((item) => item.id === point.id);
    this.#data[updatedPointId].isFavorite = !this.#data[updatedPointId].isFavorite;
    this.#pointPresentersList.get(this.#data[updatedPointId].id).init(this.#data[updatedPointId]);
  };


  #changeModeHandler = () => {
    this.#pointPresentersList.forEach((presenter) => {
      presenter.resetView();
    });
  };
}
