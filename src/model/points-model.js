import Observable from '../framework/observable.js';
import { generateDestinations } from '../mock/destination.js';
import { generateOffers, } from '../mock/offer.js';
import { generatePoint, } from '../mock/point.js';

export default class PointsModel extends Observable {
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

  updatePoint = (updateType, update) => {
    this.#points = this.#points.map((point) => point.id === update.id ? update : point);

    this._notify(updateType, update);
  };

  addPoint = (updateType, update) => {
    this.#points = [
      update,
      ...this.#points,
    ];

    this._notify(updateType, update);
  };

  deletePoint = (updateType, update) => {
    this.#points = this.#points.filter((point) => point.id !== update.id);

    this._notify(updateType);
  };
}
