import {
  render,
  RenderPosition,
} from '../framework/render.js';
import { updateItem, } from '../utils/common.js';
import BoardView from '../view/board-view.js';
import ListEmptyView from '../view/list-empty-view.js';
import SortView from '../view/sort-view.js';
import TripInfoView from '../view/trip-info-view.js';
import PointPresenter from './point-presenter.js';

const siteTripHeaderElement = document.querySelector('.trip-main');

export default class BoardPresenter {
  #boardContainer = null;
  #pointsModel = null;
  #boardPoints = [];
  #offers = [];

  #boardListComponent = new BoardView();
  #sortComponent = new SortView();
  #tripInfoComponent = new TripInfoView();
  #pointsPresenters = new Map();

  constructor(boardContainer, pointsModel) {
    this.#boardContainer = boardContainer;
    this.#pointsModel = pointsModel;
  }

  #handlePointChange = (updatedPoint) => {
    const currentOffers = this.#offers.find((obj) => obj.type === updatedPoint.type);

    this.#boardPoints = updateItem(this.#boardPoints, updatedPoint);
    this.#pointsPresenters.get(updatedPoint.id).init(updatedPoint, currentOffers);
  };

  #handleModeChange = () => {
    this.#pointsPresenters.forEach((presenter) => presenter.resetView());
  };

  #renderTripInfo = () => {
    render(this.#tripInfoComponent, siteTripHeaderElement, RenderPosition.AFTERBEGIN);
  };

  #handleSortTypeChange = (sortType) => { };

  #renderSort = () => {
    render(this.#sortComponent, this.#boardContainer, RenderPosition.AFTERBEGIN);
    this.#sortComponent.setSortTypeChangeHandler(this.#handleSortTypeChange);
  };

  #renderPoint = (point) => {
    const pointPresenter = new PointPresenter(this.#boardListComponent.element, this.#handlePointChange, this.#handleModeChange);
    const currentOffers = this.#offers.find((obj) => obj.type === point.type);

    pointPresenter.init(point, currentOffers);
    this.#pointsPresenters.set(point.id, pointPresenter);
  };

  #renderNoPoints = (filterValue) => {
    render(new ListEmptyView(filterValue), this.#boardListComponent.element);
  };

  #renderPointsList = () => {
    this.#boardPoints.forEach((point) => {
      this.#renderPoint(point);
    });
  };

  #clearPointsList = () => {
    this.#pointsPresenters.forEach((presenter) => presenter.destroy());
    this.#pointsPresenters.clear();
  };

  #renderBoard = () => {
    render(this.#boardListComponent, this.#boardContainer);

    if (this.#boardPoints.length === 0) {
      this.#renderNoPoints('Past');
      return;
    }

    this.#renderTripInfo();
    this.#renderSort();

    this.#renderPointsList();
  };

  init = () => {
    this.#boardPoints = [...this.#pointsModel.points];
    this.#offers = this.#pointsModel.offers;

    this.#renderBoard();
  };
}
