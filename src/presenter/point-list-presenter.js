import PointPresenter from './point-presenter.js';
import { UserAction, UpdateType, FilterType } from '../utilities/constants.js';
import NewPointPresenter from './new-point-presenter.js';

export default class PointListPresenter {
  #pointModel = null;
  #sort = 'DEFAULT';
  #filter = null;
  #container = null;
  #data = null;
  #filterModel = null;

  #pointPresentersList = new Map();

  constructor({ container, pointModel, filterModel }) {
    this.#container = container;
    this.#pointModel = pointModel;
    this.#filterModel = filterModel;
    this.newPointPresenter = new NewPointPresenter({
      pointModel: this.#pointModel,
      onDataAdd: this.#handleAnyViewAction
    });

    this.newPointPresenter.init();
  }

  init({ sort }) {
    this.#sort = sort;
    this.renderPointsList();
  }

  #sorting(points) {
    switch (this.#sort) {
      case 'DEFAULT':
        return points.sort((a, b) => new Date(a.dateFrom) - new Date(b.dateFrom));
      case 'PRICE':
        return points.sort((b, a) => a.basePrice - b.basePrice);
      case 'TIME':
        return points.sort((a, b) => ((new Date(a.dateTo) - new Date(a.dateFrom)) - (new Date(b.dateTo) - new Date(b.dateFrom))));
    }
  }

  #filtering(points) {
    switch (this.#filterModel.filter) {
      case FilterType.FUTURE:
        return points.filter((item) => new Date(item.dateFrom) > Date.now());
      case FilterType.PRESENT:
        return points.filter((item) => new Date(item.dateFrom) === Date.now());
      case FilterType.PAST:
        return points.filter((item) => new Date(item.dateFrom) < Date.now());
      default:
        return points;
    }
  }

  renderPointsList() {
    this.#clearPoints();
    this.#sorting(this.#filtering([...this.#pointModel.getPoint()])).forEach((item) => {
      this.#renderPoint(item);
    });
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
