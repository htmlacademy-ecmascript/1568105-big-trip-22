import { render } from '../render.js';
import { EVENT_LIST_ITEMS_VOLUME } from '../utilities/constants.js'
import SortListView from '../view/sort-list-view.js';
import NewPointFormView from '../view/new-point-form-view.js';
import PointFormEditView from '../view/point-form-edit-view.js';
import PointListView from '../view/point-list-view.js';
import PointItemView from '../view/point-item-view.js';

class EventsPresenter {
  pointListComponent = new PointListView();

  constructor({eventsContainer}) {
    this.eventsContainer = eventsContainer;
  }


  init() {
    render(new SortListView(), this.eventsContainer);
    render(this.pointListComponent, this.eventsContainer);
    render(new PointFormEditView(), this.pointListComponent.getElement());

    for (let i = 0; i < EVENT_LIST_ITEMS_VOLUME; i++) {
      render(new PointItemView(), this.pointListComponent.getElement());
    }

    render(new NewPointFormView(), this.pointListComponent.getElement());
  }
}
export default EventsPresenter;
