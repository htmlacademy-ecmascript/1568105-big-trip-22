import { mockDestinations } from '../mocks/destinations.js';
import { mockOffers } from '../mocks/offers.js';
import { mockPoints } from '../mocks/points.js';

export default class PointModel {
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
}
