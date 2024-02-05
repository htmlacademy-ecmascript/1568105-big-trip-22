import { remove, render, replace } from '../framework/render.js';
import { Mode } from '../utilities/constants.js';
import PointItem from '../view/point-item.js';
import EditPoint from '../view/edit-point.js';
import { UserAction, UpdateType } from '../utilities/constants.js';

export default class PointPresenter {
  #pointData = null;
  #pointComponent = null;
  #editPointComponent = null;
  #container = null;
  #pointModel = null;
  #mode = Mode.DEFAULT;
  #changeModeToEdit = null;
  #setFavorite = null;
  #onDataChange = null;

  constructor({ container, pointModel, changeModeToEdit, setFavorite, onDataChange}) {
    this.#container = container;
    this.#pointModel = pointModel;
    this.#changeModeToEdit = changeModeToEdit;
    this.#setFavorite = setFavorite;
    this.#onDataChange = onDataChange;
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
      model: this.#pointModel,
      onSubmit: this.#onDataChangeHandler,
      onDelete: this.#onDataDeleteHandler,
      onRollUpClick: this.rollUpClickHandler
    });

    if (previousPointComponent === null || previousEditComponent === null) {
      render(this.#pointComponent, this.#container);
      return;
    }

    if (this.#mode === Mode.DEFAULT) {
      replace(this.#pointComponent, previousPointComponent);
    }

    if (this.#mode === Mode.EDITING) {
      replace(this.#pointComponent, previousEditComponent);
      this.#mode = Mode.DEFAULT;
    }

    remove(previousPointComponent);
    remove(previousEditComponent);
  }

  rollUpClickHandler = () => {
    this.#editPointComponent.updateElement({
      point: this.#pointData
    });
    this.replaceFormToPoint();
    document.removeEventListener('keydown', this.escKeyDownHandler);
  };

  escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      this.#editPointComponent.updateElement({
        point: this.#pointData
      });
      this.replaceFormToPoint();
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
    document.removeEventListener('keydown', this.escKeyDownHandler);
  }

  resetView() {
    if (this.#mode === Mode.EDITING) {
      this.#editPointComponent.updateElement({
        point: this.#pointData
      });
      this.replaceFormToPoint();
    }
  }

  delete() {
    remove(this.#pointComponent);
    remove(this.#editPointComponent);
  }

  #onDataChangeHandler = (point) => {
    this.#onDataChange(
      UserAction.UPDATE_POINT,
      UpdateType.я,
      point
    );
    document.removeEventListener('keydown', this.escKeyDownHandler);
  };

  #onDataDeleteHandler = (point) => {
    this.#onDataChange(
      UserAction.DELETE_POINT,
      UpdateType.MAJOR,
      point
    );
  };

  setSaving = () => {
    if (this.#mode === Mode.EDITING) {
      this.#editPointComponent.updateElement({
        isSaving: true,
        isDisabled: true
      });
    }
  };

  setDeleting = () => {
    if (this.#mode === Mode.EDITING) {
      this.#editPointComponent.updateElement({
        isDeleting: true,
        isDisabled: true
      });
    }
  };

  setError = () => {
    const resetFormState = () => {
      this.#editPointComponent.updateElement({
        isSaving: false,
        isDisabled: false,
        isDeleting: false
      });
    };
    this.#editPointComponent.shake(resetFormState);
    document.addEventListener('keydown', this.escKeyDownHandler);
  };

  setFail = () => {
    this.#pointComponent.shake();
  };
}
