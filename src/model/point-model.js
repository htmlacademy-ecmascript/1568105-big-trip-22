import { TRIP_ITEMS_VOLUME } from '../utilities/constants.js';
// import { getRandomPoints } from '../mocks/points.js';
import { mockPoints } from '../mocks/points.js';
import { mockDestinations } from '../mocks/destinations.js';
import { mockOffers } from '../mocks/offers.js';

export default class PointModel {
  points = Array.from({length: TRIP_ITEMS_VOLUME}, mockPoints);
  destinations = mockDestinations;
  offers = mockOffers;

  getPoint() {
    return this.points;
  }

  getOffer() {
    return this.offers;
  }

  getOfferByType(type) {
    const allOffers = this.getOffer();
    return allOffers.find((offer) => offer.type === type);
  }

  getOfferById(type, itemId) {
    const offerType = this.getOfferByType(type);
    return offerType.offer.fiter((item) => itemId.find((id) => item.id === id));
  }

  getDestination() {
    return this.destination;
  }

  getDestinationById(id) {
    const allDestinations = this.getDestination();
    return allDestinations.find((item) => item.id === id);
  }

};
