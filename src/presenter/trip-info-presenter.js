import { FilterType } from '../const.js';
import { render, RenderPosition, remove, replace } from '../framework/render.js';
import { filter } from '../utils/filter.js';
import { formatDate } from '../utils/point.js';
import TripInfoView from '../view/trip-info-view.js';

const siteTripInfoElement = document.querySelector('.trip-main');

export default class TripInfoPresenter {
  #tripInfoComponent = null;
  #pointsModel = null;
  #sortedPoints = null;

  constructor(pointsModel) {
    this.#pointsModel = pointsModel;

    this.#pointsModel.addObserver(this.#handleModelEvent);
  }

  init = () => {
    const prevTripInfoComponent = this.#tripInfoComponent;

    if (this.#pointsModel.points.length === 0) {
      return;
    }

    this.#sortedPoints = filter[FilterType.DEFAULT](this.#pointsModel.points);
    const dateFrom = this.#getDateFrom(this.#sortedPoints[0]);
    const dateTo = this.#getDateTo(this.#sortedPoints[this.#sortedPoints.length - 1]);
    const route = this.#getRoute(this.#sortedPoints);

    this.#tripInfoComponent = new TripInfoView(this.#calculateTotalPrice(), dateFrom, dateTo, route);

    if (prevTripInfoComponent === null) {
      render(this.#tripInfoComponent, siteTripInfoElement, RenderPosition.AFTERBEGIN);
      return;
    }

    replace(this.#tripInfoComponent, prevTripInfoComponent);
    remove(prevTripInfoComponent);
  };

  #handleModelEvent = () => {
    this.init();
  };

  #calculateTotalPrice = () => {
    let totalPrice = 0;

    this.#pointsModel.points.forEach((point) => {
      const offers = this.#pointsModel.offers.find((offer) => offer.type === point.type).offers;

      offers.forEach((offer) => {
        if (point.offers.includes(offer.id)) {
          totalPrice += offer.price;
        }
      });

      totalPrice += point.basePrice;
    });

    return totalPrice;
  };

  #getDateFrom = (point) => formatDate(point.dateFrom, 'MMM DD');

  #getDateTo = (point) => formatDate(point.dateTo, 'MMM DD');

  #getRoute = (points) => {
    const destinations = points.map((point) => point.destination.name);

    switch(destinations.length) {
      case 1:
        return `${destinations[0]} — ${destinations[0]}`;
      case 2:
        return `${destinations[0]} — ${destinations[1]}`;
      case 3:
        return `${destinations[0]} — ${destinations[1]} — ${destinations[2]}`;
      default:
        return `${destinations[0]} —...— ${destinations[destinations.length - 1]}`;
    }
  };
}
