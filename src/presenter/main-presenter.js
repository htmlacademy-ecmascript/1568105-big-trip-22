import { render } from '../framework/render.js';
// import MainSortList from '../view/main-sort-list.js';
import PointList from '../view/point-list.js';
import PointListPresenter from './point-list-presenter.js';
import { UpdateType } from '../utilities/constants.js';

export default class MainPresenter {
  pointListComponent = new PointList();

  #pointListPresenter = null;

  constructor({ mainContainer, pointModel, filterModel, headerTopInfoPresenter }) {
    this.mainContainer = mainContainer;
    this.pointModel = pointModel;
    this.filterModel = filterModel;
    this.headerTopInfoPresenter = headerTopInfoPresenter;

    this.#pointListPresenter = new PointListPresenter({
      container: this.pointListComponent,
      pointModel: this.pointModel,
      filterModel: this.filterModel,
      mainContainer: this.mainContainer,
      headerTopInfoPresenter: this.headerTopInfoPresenter
    });
    this.pointModel.addObserver(this.#handleModelEvent);
    this.filterModel.addObserver(this.#handleModelEvent);
  }

  #handleModelEvent = (updateType, data) => {
    switch (updateType) {
      case UpdateType.PATCH:
        // this.#pointListPresenter.updatePoint(data);
        this.#pointListPresenter.renderPointsList();
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

        // case UpdateType.ADDING:
        //   this.#pointListPresenter.resetFilter();
        //   this.#pointListPresenter.resetSort();
        //   this.#pointListPresenter.renderPointsList();
  
        //   break;
    }
  };

  init() {
    this.#renderMain();
  }

  #renderMain() {
    this.#renderPointListComponent();
    this.#renderListPoints();
  }

  #renderPointListComponent() {
    render(this.pointListComponent, this.mainContainer);

  }

  #renderListPoints() {
    this.#pointListPresenter.init({
      sort: 'DEFAULT'
    });
  }
}
