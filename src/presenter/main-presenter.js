import { render } from '../render.js';
import { POINTS_VOLUME } from '../utilities/constants.js';
import MainSortList from '../view/main-sort-list.js';
import PointList from '../view/point-list.js';
import PointListItem from '../view/point-list-item.js';
import EditPoint from '../view/edit-point.js';
// import NewPointForm from '../view/new-point-form.js';

export default class MainPresenter {
  constructor({mainContainer}) {
    this.mainContainer = mainContainer;
    this.mainSortListComponent = new MainSortList();
    this.pointListComponent = new PointList();
    this.editPointComponent = new EditPoint();
    // this.listItemComponent = new PointListItem();
    // this.newPointFormComponent = new NewPointForm();
  }

  init() {
    render(this.mainSortListComponent, this.mainContainer);
    render(this.pointListComponent, this.mainContainer);
    render(this.editPointComponent, this.pointListComponent.getElement());

    for (let i = 0; i < POINTS_VOLUME; i++) {
      render(new PointListItem(), this.pointListComponent.getElement());
    }
  }
}
