import { SortTypes, UpdateTypes, UserActions } from '../const.js';
import {
  remove,
  render,
  RenderPosition,
} from '../framework/render.js';
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
  #offers = [];
  #destinations = [];

  #boardListComponent = new BoardView();
  #sortComponent = null;
  #tripInfoComponent = new TripInfoView();
  #pointsPresenters = new Map();
  #currentSortType = SortTypes.DEFAULT;

  constructor(boardContainer, pointsModel) {
    this.#boardContainer = boardContainer;
    this.#pointsModel = pointsModel;

    this.#pointsModel.addObserver(this.#handleModelEvent);
  }

  #handleViewAction = (actionType, updateType, update) => {
    switch (actionType) {
      case UserActions.UPDATE_POINT:
        this.#pointsModel.updatePoint(updateType, update);
        break;
      case UserActions.ADD_POINT:
        this.#pointsModel.addPoint(updateType, update);
        break;
      case UserActions.DELETE_POINT:
        this.#pointsModel.deletePoint(updateType, update);
        break;
    }
  };

  #handleModelEvent = (updateType, data) => {
    switch (updateType) {
      case UpdateTypes.PATCH:
        this.#pointsPresenters.get(data.id).init(data, this.#offers, this.#destinations);
        break;
      case UpdateTypes.MINOR:
        this.#clearBoard();
        this.#renderBoard();
        break;
      case UpdateTypes.MAJOR:
        this.#clearBoard({resetSortType: true});
        this.#renderBoard();
        break;
    }
  };

  #handleModeChange = () => {
    this.#pointsPresenters.forEach((presenter) => presenter.resetView());
  };

  #renderTripInfo = () => {
    render(this.#tripInfoComponent, siteTripHeaderElement, RenderPosition.AFTERBEGIN);
  };

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#currentSortType = sortType;
    this.#clearBoard();
    this.#renderBoard();
  };

  #renderSort = () => {
    this.#sortComponent = new SortView(this.#currentSortType);
    this.#sortComponent.setSortTypeChangeHandler(this.#handleSortTypeChange);

    render(this.#sortComponent, this.#boardContainer, RenderPosition.AFTERBEGIN);
  };

  #renderPoint = (point) => {
    const pointPresenter = new PointPresenter(this.#boardListComponent.element, this.#handleViewAction, this.#handleModeChange);
    pointPresenter.init(point, this.#offers, this.#destinations);
    this.#pointsPresenters.set(point.id, pointPresenter);
  };

  #renderNoPoints = (filterValue) => {
    render(new ListEmptyView(filterValue), this.#boardListComponent.element);
  };

  #renderPoints = (points) => {
    points.forEach((point) => this.#renderPoint(point));
  };

  #clearBoard = ({ resetSortType = false } = {}) => {
    this.#pointsPresenters.forEach((presenter) => presenter.destroy());
    this.#pointsPresenters.clear();

    remove(this.#sortComponent);

    if (resetSortType) {
      this.#currentSortType = SortTypes.DEFAULT;
    }
  };

  #renderBoard = () => {
    render(this.#boardListComponent, this.#boardContainer);

    if (this.points.length === 0) {
      this.#renderNoPoints('Past');
      return;
    }

    this.#renderTripInfo();
    this.#renderSort();

    this.#renderPoints(this.points);
  };

  get points() {
    switch (this.#currentSortType) {
      case SortTypes.PRICE:
        return [...this.#pointsModel.points].sort(sortPointPrice);
      case SortTypes.TIME:
        return [...this.#pointsModel.points].sort(sortPointTime);
    }

    return this.#pointsModel.points;
  }

  init = () => {
    this.#offers = this.#pointsModel.offers;
    this.#destinations = this.#pointsModel.destinations;

    this.#renderBoard();
  };
}
