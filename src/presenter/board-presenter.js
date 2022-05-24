import { SortTypes } from '../const.js';
import {
  render,
  RenderPosition,
} from '../framework/render.js';
import { updateItem, } from '../utils/common.js';
import { sortPointPrice, sortPointTime } from '../utils/point.js';
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
  #destinations = [];

  #boardListComponent = new BoardView();
  #sortComponent = new SortView();
  #tripInfoComponent = new TripInfoView();
  #pointsPresenters = new Map();
  #currentSortType = SortTypes.DEFAULT;
  #sourcedBoardPoints = [];

  constructor(boardContainer, pointsModel) {
    this.#boardContainer = boardContainer;
    this.#pointsModel = pointsModel;
  }

  #handlePointChange = (updatedPoint) => {
    this.#boardPoints = updateItem(this.#boardPoints, updatedPoint);
    this.#sourcedBoardPoints = updateItem(this.#sourcedBoardPoints, updatedPoint);
    this.#pointsPresenters.get(updatedPoint.id).init(updatedPoint, this.#offers);
  };

  #handleModeChange = () => {
    this.#pointsPresenters.forEach((presenter) => presenter.resetView());
  };

  #renderTripInfo = () => {
    render(this.#tripInfoComponent, siteTripHeaderElement, RenderPosition.AFTERBEGIN);
  };

  #sortPoints = (sortType) => {
    switch (sortType) {
      case SortTypes.PRICE:
        this.#boardPoints.sort(sortPointPrice);
        this.#currentSortType = SortTypes.PRICE;
        break;

      case SortTypes.TIME:
        this.#boardPoints.sort(sortPointTime);
        this.#currentSortType = SortTypes.TIME;
        break;

      default:
        this.#boardPoints = [...this.#sourcedBoardPoints];
        this.#currentSortType = SortTypes.DEFAULT;
    }
  };

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#sortPoints(sortType);
    this.#clearPointsList();
    this.#renderPointsList();
  };

  #renderSort = () => {
    render(this.#sortComponent, this.#boardContainer, RenderPosition.AFTERBEGIN);
    this.#sortComponent.setSortTypeChangeHandler(this.#handleSortTypeChange);
  };

  #renderPoint = (point) => {
    const pointPresenter = new PointPresenter(this.#boardListComponent.element, this.#handlePointChange, this.#handleModeChange);

    pointPresenter.init(point, this.#offers, this.#destinations);
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
    this.#destinations = this.#pointsModel.destinations;
    this.#sourcedBoardPoints = [...this.#pointsModel.points];

    this.#renderBoard();
  };
}
