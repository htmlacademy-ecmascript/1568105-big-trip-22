import PointPresenter from './point-presenter.js';
import {UserAction, UpdateType} from '../utilities/constants.js';

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

    this.renderPointsList();
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

  renderPointsList() {
    this.#clearPoints();
    this.#sorting([...this.#pointModel.getPoint()]).forEach((item) => {
      this.#renderPoint(item);
    });
    // for (let i = 0; i < this.#data.length; i++) {
    //   this.#renderPoint((this.#data[i]));
    // }
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
      setFavorite: this.#setFavorite,
      onDataChange: this.#handleAnyViewAction
    });

    this.#pointPresentersList.set(pointData.id, pointPresenterComponent);
    pointPresenterComponent.init(pointData);
  }

  #setFavorite = (point) => {
    this.#handleAnyViewAction(
      UserAction.UPDATE_POINT,
      UpdateType.PATCH,
      {
        ...point,
        isFavorite: !point.isFavorite
      }
    );
  };

  #changeModeHandler = () => {
    this.#pointPresentersList.forEach((presenter) => {
      presenter.resetView();
    });
  };

  #handleAnyViewAction = (actionType, updateType, point) => {
    switch (actionType) {
      case UserAction.UPDATE_POINT:
        this.#pointModel.updatePoint(updateType, point);
        break;
      case UserAction.ADD_POINT:
        this.#pointModel.addPoint(updateType, point);
        break;
      case UserAction.DELETE_POINT:
        this.#pointModel.deletePoint(updateType, point);
        break;
    }
  };

  updatePoint(point){
    this.#pointPresentersList.get(point.id)?.init(point);
  }
}
