import { render, remove } from '../framework/render.js';
import PointPresenter from './point-presenter.js';
import {
  UserAction,
  UpdateType,
  FilterType,
  TimeLimit,
  EmptyListMessage
} from '../utilities/constants.js';
import NewPointPresenter from './new-point-presenter.js';
import UIBlocker from '../framework/ui-blocker/ui-blocker.js';
import ListEmpty from '../view/list-empty.js';

export default class PointListPresenter {
  #pointModel = null;
  #sort = 'DEFAULT';
  #container = null;
  #filterModel = null;
  #message = null;

  #pointPresentersList = new Map();

  #uiBlocker = new UIBlocker({
    lowerLimit: TimeLimit.LOWER_LIMIT,
    upperLimit: TimeLimit.UPPER_LIMIT,
  });

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
    this.#clearMessage();

    const list = this.#sorting(this.#filtering([...this.#pointModel.getPoint()]));

    if (this.#pointModel.isLoading) {
      // console.log('loading')
      this.#renderMessage(EmptyListMessage.LOADING);
      this.newPointPresenter.setDisabled();
      return;
    }

    if (this.#pointModel.isLoadingError) {
      this.#renderMessage(EmptyListMessage.FAILD);
      this.newPointPresenter.setDisabled();
      return;
    }

    if (list.length === 0) {
      this.#renderMessage(EmptyListMessage[this.#filterModel.filter.toUpperCase()]);
      return;
    }

    list.forEach((item) => {
      this.#renderPoint(item);
    });

  }

  #renderMessage = (message) => {
    this.#message = new ListEmpty(message);
    render(this.#message, document.querySelector('.trip-events'));
  };

  #clearMessage = () => {
    remove(this.#message);
  };

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

  #handleAnyViewAction = async (actionType, updateType, point) => {
    this.#uiBlocker.block();

    switch (actionType) {
      case UserAction.UPDATE_POINT:
        this.#pointPresentersList.get(point.id).setSaving();
        try {
          await this.#pointModel.updatePoint(updateType, point);
        } catch (error) {

        }
        break;
      case UserAction.ADD_POINT:
        this.#pointPresentersList.get(point.id).setSaving();
        try {
          await this.#pointModel.addPoint(updateType, point);
        } catch (error) {

        }
        break;
      case UserAction.DELETE_POINT:
        this.#pointPresentersList.get(point.id).setDeleting();
        try {
          await this.#pointModel.deletePoint(updateType, point);
        } catch (error) {

        }
        break;
    }

    this.#uiBlocker.unblock();
  };

  updatePoint(point) {
    this.#pointPresentersList.get(point.id)?.init(point);
  }
}
