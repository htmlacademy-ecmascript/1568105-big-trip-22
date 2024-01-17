import { remove, render, replace } from '../framework/render.js';
import { Mode } from '../utilities/constants.js';
import PointItem from '../view/point-item.js';
import EditPoint from '../view/edit-point.js';

export default class PointPresenter {
  #pointData = null;
  #pointComponent = null;
  #editPointComponent = null;
  #container = null;
  #pointModel = null;
  #mode = Mode.DEFAULT;
  #changeModeToEdit = null;
  #setFavorite = null;

  constructor ({container, pointModel, changeModeToEdit, setFavorite}) {
    this.#container = container;
    this.#pointModel = pointModel;
    this.#changeModeToEdit = changeModeToEdit;
    this.#setFavorite = setFavorite;
  }

  init(onePointData) {
    this.#pointData = onePointData;
    this.#renderPoint();
  }


  #renderPoint() {
    const previousPointComponent = this.#pointComponent;
    const previousEditComponent = this.#editPointComponent;

    this.#pointComponent = new PointItem({
      point: this.#pointData,
      offers: [...this.#pointModel.getOfferById(this.#pointData.offers, this.#pointData.type)],
      destination: this.#pointModel.getDestinationById(this.#pointData.destination),
      onEditClick: () => {
        this.replacePointToForm();

        document.addEventListener('keydown', this.escKeyDownHandler);
      },
      setFavorite: this.#setFavorite
    });

    this.#editPointComponent = new EditPoint({
      point: this.#pointData,
      offers: [...this.#pointModel.getOfferById(this.#pointData.offers, this.#pointData.type)],
      destination: this.#pointModel.getDestinationById(this.#pointData.destination),
      onSubmit: () => {
        this.replaceFormToPoint();

        document.removeEventListener('keydown', this.escKeyDownHandler);
      }
    });

    if (previousPointComponent === null || previousEditComponent === null) {
      render(this.#pointComponent, this.#container);
      return;
    }

    if (this.#mode === Mode.DEFAULT) {
      replace(this.#pointComponent, previousPointComponent);
    }

    if (this.#mode === Mode.EDITING) {
      replace(this.#editPointComponent, previousEditComponent);
    }

    remove(previousPointComponent);
    remove(previousEditComponent);
  }

  escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      this.replaceFormToPoint();
      document.removeEventListener('keydown', this.escKeyDownHandler);
    }
  };

  replacePointToForm() {
    this.#changeModeToEdit();
    replace(this.#editPointComponent, this.#pointComponent);
    this.#mode = Mode.EDITING;
  }

  replaceFormToPoint() {
    replace(this.#pointComponent, this.#editPointComponent);
    this.#mode = Mode.DEFAULT;
  }

  resetView() {
    if (this.#mode === Mode.EDITING) {
      this.replaceFormToPoint();
    }
  }
}
