import { render } from '../framework/render.js';
import MainSortList from '../view/main-sort-list.js';
import PointList from '../view/point-list.js';
import PointPresenter from './point-presenter.js';

export default class MainPresenter {
  mainSortListComponent = new MainSortList();
  pointListComponent = new PointList();
  #pointPresentersList = new Map();

  constructor({mainContainer, pointModel}) {
    this.mainContainer = mainContainer;
    this.pointModel = pointModel;
  }

  init() {
    this.#renderMain();
  }

  #renderMain() {
    this.boardPoint = [...this.pointModel.getPoint()];

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
    for (let i = 0; i < this.boardPoint.length; i++) {
      this.#renderPoint((this.boardPoint[i]));
    }
  }

  #renderPoint(pointData) {
    const pointPresenterComponent = new PointPresenter({
      container: this.pointListComponent.element,
      pointModel: this.pointModel,
      changeModeToEdit: this.#changeModeHandler,
      setFavorite: this.#setFavorite
    });

    this.#pointPresentersList.set(pointData.id, pointPresenterComponent);

    pointPresenterComponent.init(pointData);
  }

  #changeModeHandler = () => {
    this.#pointPresentersList.forEach((presenter) => {
      presenter.resetView();
    });
  };

  #setFavorite = (point) => {
    const updatedPointId = this.boardPoint.findIndex((item) => item.id === point.id);
    this.boardPoint[updatedPointId].isFavorite = !this.boardPoint[updatedPointId].isFavorite;
    this.#pointPresentersList.get(this.boardPoint[updatedPointId].id).init(this.boardPoint[updatedPointId]);
  };
}
