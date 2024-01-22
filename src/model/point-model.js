import { mockDestinations } from '../mocks/destinations.js';
import { mockOffers } from '../mocks/offers.js';
import { mockPoints } from '../mocks/points.js';
import Observable from '../framework/observable.js';

export default class PointModel extends Observable {
  point = mockPoints;
  offers = mockOffers;
  destinations = mockDestinations;

  getPoint() {
    return this.point;
  }

  getOffers() {
    return this.offers;
  }

  getOfferByType(type) {
    const allOffers = this.getOffers();
    return allOffers.find((offer) => offer.type === type);
  }

  getOfferById = (ids, type) => {
    const offers = mockOffers.find((item) => item.type === type).offers;
    return ids.map((item) => offers.find((element) => element.id === item));
  };

  getOfferPriceById = (id, type) => {
    const offer = mockOffers.find((item) => item.type === type).offers;
    return offer.find((item) => item.id === id).price;
  };

  getDestinations() {
    return this.destinations;
  }

  getDestinationById(id) {
    const allDestination = this.getDestinations();
    return allDestination.find((item) => item.id === id);
  }

  getDestinationByName(name) {
    const allDestination = this.getDestinations();
    return allDestination.find((item) => item.name === name);
  }

  updatePoint(updateType, update) {
    const index = this.point.findIndex((item) => item.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t update unexisting task');
    }

    this.point = [
      ...this.point.slice(0, index),
      update,
      ...this.point.slice(index + 1),
    ];

    this._notify(updateType, update);
  }

  addPoint(updateType, update) {
    this.point = [
      update,
      ...this.point,
    ];

    this._notify(updateType, update);
  }

  deletePoint(updateType, update) {
    const index = this.point.findIndex((item) => item.id === update.id);
    if (index === -1) {
      throw new Error('Can\'t delete unexisting task');
    }
    this.point = [
      ...this.point.slice(0, index),
      ...this.point.slice(index + 1),
    ];

    this._notify(updateType, update);
  }
}
