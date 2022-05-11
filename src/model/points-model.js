import { generateOffers, } from '../mock/offer.js';
import { generatePoint, } from '../mock/point.js';

export default class PointsModel {
  #points = Array.from({ length: 10 }, generatePoint);
  #offers = generateOffers();

  get points() {
    return this.#points;
  }

  get offers() {
    return this.#offers;
  }
}
