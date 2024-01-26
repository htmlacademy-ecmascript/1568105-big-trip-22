import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';

function createAddNewPointButton({ disabled }) {
  return `
    <button
      class="trip-main__event-add-btn  btn  btn--big  btn--yellow"
      type="button" ${disabled ? 'disabled' : ''}
    >New event</button>`;
}

export default class AddNewPointButtonView extends AbstractStatefulView {
  #onClick = null;
  constructor({ onClick }) {
    super();
    this.#onClick = onClick;
    this._setState(AddNewPointButtonView.parseAddModeState(false));
    this._restoreHandlers();
  }

  _restoreHandlers() {
    this.element.addEventListener('click', this.#onClickHandler);
  }

  static parseAddModeState = (addingMode) => ({ addingMode });

  static parseStateToPoint = (addingMode) => state.addingMode;


  get template() {
    return createAddNewPointButton({ disabled: this._state.addingMode });
  }

  #onClickHandler = () => {
    this.updateElement({
      addingMode: !this._state.addingMode
    });
    this.#onClick();
  };

  reset = () => {
    this.updateElement({
      addingMode: !this._state.addingMode
    });
  };
}
