import { render } from '../render.js';
// import { POINT_LIST_LENGTH } from '../utilities/constants.js';
import MainSortList from '../view/main-sort-list.js';
import PointList from '../view/point-list.js';
import PointItem from '../view/point-item.js';
import EditPoint from '../view/edit-point.js';

export default class MainPresenter {
  mainSortListComponent = new MainSortList();
  pointListComponent = new PointList();
  editPointComponent = new EditPoint();

  constructor({mainContainer, pointModel}) {
    this.mainContainer = mainContainer;
    this.pointModel = pointModel;
  }

  init() {
    this.boardPoint = [...this.pointModel.getPoint()];

    render(this.mainSortListComponent, this.mainContainer);
    render(this.pointListComponent, this.mainContainer);
    render(this.editPointComponent, this.pointListComponent.getElement());

    for (let i = 0; i < this.boardPoint.length; i++) {

      render(
        new PointItem(
          {
            point: this.boardPoint[i],
            offers: [...this.pointModel.getOfferById(this.boardPoint[i].offers, this.boardPoint[i].type)],
            destination: this.pointModel.getDestinationById(this.boardPoint[i].destination)
          }
        ),this.pointListComponent.getElement()
      );
    }
  }
}
