import { render, replace } from '../framework/render.js';
// import { POINT_LIST_LENGTH } from '../utilities/constants.js';
import MainSortList from '../view/main-sort-list.js';
import PointList from '../view/point-list.js';
import PointItem from '../view/point-item.js';
import EditPoint from '../view/edit-point.js';

export default class MainPresenter {
  mainSortListComponent = new MainSortList();
  pointListComponent = new PointList();

  constructor({mainContainer, pointModel}) {
    this.mainContainer = mainContainer;
    this.pointModel = pointModel;
  }

  init() {
    this.boardPoint = [...this.pointModel.getPoint()];

    render(this.mainSortListComponent, this.mainContainer);
    render(this.pointListComponent, this.mainContainer);

    for (let i = 0; i < this.boardPoint.length; i++) {

      this.#renderPoint((this.boardPoint[i]));
    }
  }

  #renderPoint(pointData) {
    const escKeyDownHandler = (evt) => {
      if (evt.key === 'Escape') {
        evt.preventDefault();
        replaceFormToPoint();
        document.removeEventListener('keydown', escKeyDownHandler);
      }
    };

    const pointComponent = new PointItem(
      {
        point: pointData,
        offers: [...this.pointModel.getOfferById(pointData.offers, pointData.type)],
        destination: this.pointModel.getDestinationById(pointData.destination),
        onEditClick: () => {
          replacePointToForm();

          document.addEventListener('keydown', escKeyDownHandler);
        }
      }
    );

    const editPointComponent = new EditPoint(
      {
        point: pointData,
        offers: [...this.pointModel.getOfferById(pointData.offers, pointData.type)],
        destination: this.pointModel.getDestinationById(pointData.destination),
        onSubmit: () => {
          replaceFormToPoint();

          document.removeEventListener('keydown', escKeyDownHandler);
        }
      }
    );

    function replacePointToForm() {
      replace(editPointComponent, pointComponent);
    };

    function replaceFormToPoint() {
      replace(pointComponent, editPointComponent);
    };

    render(pointComponent, this.pointListComponent.element);
  };
}
