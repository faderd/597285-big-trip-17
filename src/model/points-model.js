import { generateDestinations } from '../mock/destination.js';
import { generateOffers, } from '../mock/offer.js';
import { generatePoint, } from '../mock/point.js';

export default class PointsModel {
  #points = Array.from({ length: 10 }, generatePoint);
  #offers = generateOffers();
  #destinations = generateDestinations();

  get points() {
    return this.#points;
  }

  get offers() {
    return this.#offers;
  }

  get destinations() {
    return this.#destinations;
  }
}
