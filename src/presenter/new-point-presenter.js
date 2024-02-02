import { render, remove } from '../framework/render.js';
import AddNewPointButton from '../view/add-point-button.js';
import EditPoint from '../view/edit-point.js';
import { UserAction, UpdateType } from '../utilities/constants.js';

const newPointSkeleton = {
  basePrice: 0,
  dateFrom: null,
  dateTo: null,
  destination: null,
  isFavorite: false,
  offers: [],
  type: 'flight'
};

export default class NewPointPresenter {
  #newPointComponent = null;
  #pointModel = null;
  #onDataAdd = null;
  #openForm = null;

  constructor({ pointModel, onDataAdd, openForm }) {
    this.#pointModel = pointModel;
    this.#onDataAdd = onDataAdd;
    this.#openForm = openForm;

    this.addNewPointButton = new AddNewPointButton({
      onClick: () => {
        this.#addNewPointClickHandler();
      }
    });
    this.addNewButtonContainer = document.querySelector('.trip-main');
  }

  init() {
    render(this.addNewPointButton, this.addNewButtonContainer, 'beforeend');
  }

  #addNewPointClickHandler() {
    this.#newPointComponent = new EditPoint({
      point: newPointSkeleton,
      model: this.#pointModel,
      onSubmit: this.#addPointHandler,
      onDelete: this.closeForm,
      onRollUpClick: () => {
        this.closeForm();
      },
      isNewPoint: true
    });

    render(this.#newPointComponent, document.querySelector('.trip-events__list'), 'afterbegin');
    this.#openForm();
    document.addEventListener('keydown', this.#escKeyDownHandler);
  }

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      this.closeForm();
    }
  };

  closeForm = () => {
    console.log('delet form')
    remove(this.#newPointComponent);
    this.addNewPointButton.reset();
    document.removeEventListener('keydown', this.#escKeyDownHandler);
  };

  #addPointHandler = (point) => {

    this.#onDataAdd(
      UserAction.ADD_POINT,
      UpdateType.MINOR,
      point,
    );
  };

  reset() {
    remove(this.#newPointComponent);
    this.addNewPointButton.reset();
   
  }

  setDisabled() {
    this.addNewPointButton.updateElement({
      addingMode: true
    })
  }

  setEnabled() {
    this.addNewPointButton.updateElement({
      addingMode: false
    })
  }

  setSaving = () => {
    this.#newPointComponent.updateElement({
      isSaving: true,
      isDisabled: true
    });
  };

  setError = () => {
    const resetFormState = () => {
      this.#newPointComponent.updateElement({
        isSaving: false,
        isDisabled: false,
      });
    }
    this.#newPointComponent.shake(resetFormState);
  }
}
