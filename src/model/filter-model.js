import Observable from '../framework/observable.js';
import { FilterType } from '../utilities/constants.js';

export default class FilterModel extends Observable {
  #filter = FilterType.EVERYTHING;

  get filter() {
    return this.#filter;
  }

  setFilter = (updateType, filter) => {
    this.#filter = filter;
    this._notify(updateType, filter);
  };

  resetFilter = () => {
    this.#filter = FilterType.EVERYTHING;
  }
}
