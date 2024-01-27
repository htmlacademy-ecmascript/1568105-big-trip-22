import { render } from '../framework/render.js';
import MainSortList from '../view/main-sort-list.js';
import PointList from '../view/point-list.js';
import PointListPresenter from './point-list-presenter.js';
import { UpdateType } from '../utilities/constants.js';

export default class MainPresenter {
  pointListComponent = new PointList();

  #pointListPresenter = null;

  constructor({ mainContainer, pointModel, filterModel }) {
    this.mainContainer = mainContainer;
    this.pointModel = pointModel;
    this.filterModel = filterModel;
    this.mainSortListComponent = new MainSortList({
      onSort: this.#sortingHandler
    });

    this.#pointListPresenter = new PointListPresenter({
      container: this.pointListComponent,
      pointModel: this.pointModel,
      filterModel: this.filterModel
    });
    this.pointModel.addObserver(this.#handleModelEvent);
    this.filterModel.addObserver(this.#handleModelEvent);
  }

  #handleModelEvent = (updateType, data) => {
    switch (updateType) {
      case UpdateType.PATCH:
        this.#pointListPresenter.updatePoint(data);
        break;
      case UpdateType.MINOR:
        this.#pointListPresenter.renderPointsList();

        break;
      case UpdateType.INIT:
        this.#pointListPresenter.renderPointsList();

        break;
      case UpdateType.MAJOR:
        this.#pointListPresenter.renderPointsList();

        break;
    }
  };

  init() {
    this.#renderMain();
  }

  #renderMain() {
    this.#renderSortComponent();
    this.#renderPointListComponent();
    this.#renderListPoints();
  }

  #renderSortComponent() {
    render(this.mainSortListComponent, this.mainContainer);
  }

  #renderPointListComponent() {
    render(this.pointListComponent, this.mainContainer);
  }

  #renderListPoints() {
    this.#pointListPresenter.init({
      pointModel: this.pointModel,
      sort: 'DEFAULT',
      filter: 'default'
    });
  }

  #sortingHandler = (sortingType) => {
    this.#pointListPresenter.init({
      pointModel: this.pointModel,
      sort: sortingType,
      filter: 'default'
    });
  };
}
