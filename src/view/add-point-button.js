import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';

function createAddNewPointButton({ disabled }) {
  return `
    <button
      class="trip-main__event-add-btn  btn  btn--big  btn--yellow"
      type="button" ${disabled ? 'disabled' : ''}
    >New event</button>`;
}

export default class AddPointButton extends AbstractStatefulView {
  #onClick = null;
  constructor({ onClick }) {
    super();
    this.#onClick = onClick;
    this._setState(AddPointButton.parseAddModeState(false));
    this._restoreHandlers();
  }

  get template() {
    return createAddNewPointButton({ disabled: this._state.addingMode });
  }

  _restoreHandlers() {
    this.element.addEventListener('click', this.#onClickHandler);
  }

  #onClickHandler = () => {
    this.#onClick();
    this.updateElement({
      addingMode: true
    });
  };

  reset = () => {
    this.updateElement({
      addingMode: false
    });
  };

  static parseAddModeState = (addingMode) => ({ addingMode });
  static parseStateToPoint = () => this._state.addingMode;
}
