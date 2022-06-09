import AbstractView from '../framework/view/abstract-view.js';

const createTripInfoTemplate = (totalPrice, dateFrom, dateTo, route) => (
  `          <section class="trip-main__trip-info  trip-info">
  <div class="trip-info__main">
    <h1 class="trip-info__title">${route}</h1>

    <p class="trip-info__dates">${dateFrom}&nbsp;&mdash;&nbsp;${dateTo}</p>
  </div>

  <p class="trip-info__cost">
    Total: &euro;&nbsp;<span class="trip-info__cost-value">${totalPrice}</span>
  </p>
</section>`
);

export default class TripInfoView extends AbstractView {
  #totalPrice = null;
  #dateFrom = null;
  #dateTo = null;
  #route = null;

  constructor(totalPrice, dateFrom, dateTo, route) {
    super();
    this.#totalPrice = totalPrice;
    this.#dateFrom = dateFrom;
    this.#dateTo = dateTo;
    this.#route = route;
  }

  get template() {
    return createTripInfoTemplate(this.#totalPrice, this.#dateFrom, this.#dateTo, this.#route);
  }
}
