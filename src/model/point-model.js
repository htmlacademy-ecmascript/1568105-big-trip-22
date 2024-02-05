import Observable from '../framework/observable.js';
import { UpdateType } from '../utilities/constants.js';

export default class PointModel extends Observable {
  #offers = null;
  #destinations = null;
  #points = null;
  #isLoading = true;
  #isLoadingError = false;

  constructor({ service }) {
    super();
    this.pointApiService = service;
  }

  async init() {
    try {
      const points = await this.pointApiService.points;
      this.#points = points.map(this.#adaptToClient);
      this.#offers = await this.pointApiService.offers;
      this.#destinations = await this.pointApiService.destinations;

      this.#isLoading = false;
    } catch (err) {
      this.#points = [];
      this.#offers = [];
      this.#destinations = [];

      this.#isLoading = false;
      this.#isLoadingError = true;
    }
    this._notify(UpdateType.INIT);
  }

  getPoint() {
    return this.#points;
  }

  getOffers() {
    return this.#offers;
  }

  getOfferByType(type) {
    const allOffers = this.getOffers();
    return allOffers.find((offer) => offer.type === type);
  }

  getOfferById = (ids, type) => {
    const offers = this.getOffers().find((item) => item.type === type).offers;
    return ids.map((item) => offers.find((element) => element.id === item));
  };

  getOfferPriceById = (id, type) => {
    const offer = this.getOffers().find((item) => item.type === type).offers;
    return offer.find((item) => item.id === id).price;
  };

  getDestinations() {
    return this.#destinations;
  }

  getDestinationById(id) {
    const allDestination = this.getDestinations();
    return allDestination.find((item) => item.id === id);
  }

  getDestinationByName(name) {
    const allDestination = this.getDestinations();
    return allDestination.find((item) => item.name === name);
  }

  get isLoading() {
    return this.#isLoading;
  }

  get isLoadingError() {
    return this.#isLoadingError;
  }

  async updatePoint(updateType, update) {
    const index = this.#points.findIndex((item) => item.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t update unexisting point');
    }

    try {
      const response = await this.pointApiService.updatePoint(update);
      const updatedPoint = this.#adaptToClient(response);
      this.#points = [
        ...this.#points.slice(0, index),
        updatedPoint,
        ...this.#points.slice(index + 1),
      ];
      this._notify(updateType, updatedPoint);
    } catch (err) {
      throw new Error('Can\'t update point');
    }
  }

  async addPoint(updateType, update) {
    try {
      const response = await this.pointApiService.addPoint(update);
      const newPoint = this.#adaptToClient(response);
      this.#points = [
        newPoint,
        ...this.#points,
      ];
      this._notify(updateType, newPoint);
    } catch (err) {
      throw new Error('Can\'t add point');
    }
  }

  async deletePoint(updateType, update) {
    const index = this.#points.findIndex((item) => item.id === update.id);
    if (index === -1) {
      throw new Error('Can\'t delete unexisting point');
    }
    try {
      await this.pointApiService.deletePoint(update.id);

      this.#points = [
        ...this.#points.slice(0, index),
        ...this.#points.slice(index + 1),
      ];

      this._notify(updateType, update);
    } catch (err) {
      throw new Error('Can\'t delete  point');
    }
  }

  #adaptToClient(point) {
    const adaptedPoint = {
      ...point,
      basePrice: point['base_price'],
      dateFrom: point['date_from'],
      dateTo: point['date_to'],
      isFavorite: point['is_favorite'],
    };

    delete adaptedPoint['base_price'];
    delete adaptedPoint['date_from'];
    delete adaptedPoint['date_to'];
    delete adaptedPoint['is_favorite'];

    return adaptedPoint;
  }
}
