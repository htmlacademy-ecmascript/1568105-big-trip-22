import { render } from '../render.js';
import { TRIP_ITEMS_VOLUME } from '../utilities/constants.js';
import SortListView from '../view/sort-list-view.js';
import NewPointFormView from '../view/new-point-form-view.js';
import PointFormEditView from '../view/point-form-edit-view.js';
import PointListView from '../view/point-list-view.js';
import PointItemView from '../view/point-item-view.js';

export default class TripPresenter {
  pointListComponent = new PointListView();

  constructor({tripContainer}) {
    this.tripContainer = tripContainer;
  }

  init() {
    render(new SortListView(), this.tripContainer);
    render(this.pointListComponent, this.tripContainer);
    render(new PointFormEditView(), this.pointListComponent.getElement());

    for (let i = 0; i < TRIP_ITEMS_VOLUME; i++) {
      render(new PointItemView(), this.pointListComponent.getElement());
    }

    render(new NewPointFormView(), this.pointListComponent.getElement());
  }
}
