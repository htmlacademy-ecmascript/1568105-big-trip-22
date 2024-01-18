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

  getOffer() {
    return this.offers;
  }

  getOfferByTipe(type) {
    const allOffers = this.getOffer();
    return allOffers.find((offer) => offer.type === type);
  }

  // getOfferById(type, itemsId) {
  //    const offersType = this.getOfferByTipe(type);
  //    return offersType.offers.filter((item) => itemsId.find((id) => item.id === id));
  // }

  getOfferById = (ids, type) => {
    const offers = mockOffers.find((item) => item.type === type).offers;
    return ids.map((item) => offers.find((element) => element.id === item));
  };

  getDestination() {
    return this.destinations;
  }

  getDestinationById(id) {
    const allDestination = this.getDestination();
    return allDestination.find((item) => item.id === id);
  }
}