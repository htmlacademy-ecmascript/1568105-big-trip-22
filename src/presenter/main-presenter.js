import { render } from '../render.js';
import { POINTS_VOLUME } from '../utilities/constants.js';
import MainSortList from '../view/main-sort-list.js';
import PointList from '../view/point-list.js';
import PointListItem from '../view/point-list-item.js';
import EditPoint from '../view/edit-point.js';
// import NewPointForm from '../view/new-point-form.js';

const mainContainer = document.querySelector('.trip-events');

export default class MainPresenter {
  mainSortListComponent = new MainSortList();
  pointListComponent = new PointList();
  listItemComponent = new PointListItem();
  pointEditorComponent = new EditPoint();
  // newPointFormComponent = new NewPointForm();

  // constructor(mainContainer) {
  //   this.mainContainer = mainContainer;
  // }

  init() {
    render(this.mainSortListComponent, mainContainer);
    render(this.pointListComponent, mainContainer);

    render(new EditPoint(), this.pointListComponent.getElement());

    for (let i = 0; i < POINTS_VOLUME; i++) {
      render(new PointListItem(), this.pointListComponent.getElement());
    }
  }
}
