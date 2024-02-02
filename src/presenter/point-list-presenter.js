import { RenderPosition, render, remove } from '../framework/render.js';
import PointPresenter from './point-presenter.js';
import MainSortList from '../view/main-sort-list.js';
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
  #headerTopInfoPresenter = null;

  #pointPresentersList = new Map();

  #uiBlocker = new UIBlocker({
    lowerLimit: TimeLimit.LOWER_LIMIT,
    upperLimit: TimeLimit.UPPER_LIMIT,
  });

  constructor({ container, pointModel, filterModel, mainContainer, headerTopInfoPresenter }) {
    this.#container = container;
    this.#pointModel = pointModel;
    this.#filterModel = filterModel;
    this.mainContainer = mainContainer;
    this.#headerTopInfoPresenter = headerTopInfoPresenter

    this.newPointPresenter = new NewPointPresenter({
      pointModel: this.#pointModel,
      onDataAdd: this.#handleAnyViewAction,
      openForm: this.#createNewPoint
    });

    // this.mainSortListComponent = new MainSortList({
    //   onSort: this.#sortingHandler
    // });

    this.newPointPresenter.init();
    this.#filterModel.addObserver(() => {
      this.init({ sort: 'DEFAULT' });
      this.#removeSortComponent();
      this.#renderSortComponent()

    });
  }

  #sortingHandler = (sortingType) => {
    this.init({
      sort: sortingType,
    });
  };

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
        return points.sort((b, a) => ((new Date(a.dateTo) - new Date(a.dateFrom)) - (new Date(b.dateTo) - new Date(b.dateFrom))));
    }
  }

  #filtering(points) {
    switch (this.#filterModel.filter) {
      case FilterType.FUTURE:
        return points.filter((item) => new Date(item.dateFrom) > Date.now());
      case FilterType.PRESENT:
        return points.filter((item) => new Date(item.dateFrom) <= Date.now() && new Date(item.dateTo) >= Date.now());
      case FilterType.PAST:
        return points.filter((item) => new Date(item.dateTo) < Date.now());
      default:
        return points;
    }
  }

  renderPointsList() {
    this.#clearPoints();
    this.#clearMessage();
    this.#removeSortComponent();
    if (this.#pointModel.isLoading) {
      this.#renderMessage(EmptyListMessage.LOADING);
      this.newPointPresenter.setDisabled();
      return;
    }

    if (this.#pointModel.isLoadingError) {
      this.#renderMessage(EmptyListMessage.FAILD);
      this.newPointPresenter.setDisabled();
      return;
    }

    const list = this.#sorting(this.#filtering([...this.#pointModel.getPoint()]));
    this.newPointPresenter.setEnabled();
    this.#headerTopInfoPresenter.init({ model: this.#pointModel, points: list })
    if (list.length === 0) {
      this.#sort = 'DEFAULT';
      this.#renderMessage(EmptyListMessage[this.#filterModel.filter.toUpperCase()]);
      return;
    }
    this.#renderSortComponent();

    list.forEach((item) => {
      this.#renderPoint(item);
    });
  }

  #removeSortComponent() {
    if (this.mainSortListComponent) {
      remove(this.mainSortListComponent)
    }
  }

  #renderSortComponent() {
    this.mainSortListComponent = new MainSortList({
      onSort: this.#sortingHandler,
      sorting: this.#sort
    });
    render(this.mainSortListComponent, this.mainContainer, RenderPosition.AFTERBEGIN);
  }

  #renderMessage = (message) => {
    this.#message = new ListEmpty(message);
    render(this.#message, document.querySelector('.trip-events'));
  };

  #clearMessage = () => {
    remove(this.#message)
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
      onDataChange: this.#handleAnyViewAction,
    });

    this.#pointPresentersList.set(pointData.id, pointPresenterComponent);
    pointPresenterComponent.init(pointData);
  }

  #createNewPoint = () => {
    remove(this.#message);
    this.#pointPresentersList.forEach((presenter) => {
      presenter.resetView();
    });
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
    this.newPointPresenter.closeForm();
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
          this.#pointPresentersList.get(point.id).setError()
        }
        break;
      case UserAction.ADD_POINT:
        console.log('add point')
        this.newPointPresenter.setSaving();
        try {
          await this.#pointModel.addPoint(updateType, point);
          console.log('add point2')
          this.newPointPresenter.closeForm();
        } catch (error) {
          console.log(error)
          this.newPointPresenter.setError()
        }
        break;
      case UserAction.DELETE_POINT:
        this.#pointPresentersList.get(point.id).setDeleting();
        try {
          await this.#pointModel.deletePoint(updateType, point);
        } catch (error) {
          this.#pointPresentersList.get(point.id).setError()
        }
        break;
    }
    this.#uiBlocker.unblock();
  };

  updatePoint(point) {
    this.#pointPresentersList.get(point.id)?.init(point);
    const list = this.#sorting(this.#filtering([...this.#pointModel.getPoint()]));
    this.#headerTopInfoPresenter.init({ model: this.#pointModel, points: list })
  }
}
