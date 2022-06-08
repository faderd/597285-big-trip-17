import { FilterTypes, SortTypes, UpdateTypes, UserActions } from '../const.js';
import {
  remove,
  render,
  RenderPosition,
} from '../framework/render.js';
import { filters } from '../utils/filter.js';
import { sortPointDay, sortPointPrice, sortPointTime } from '../utils/point.js';
import BoardView from '../view/board-view.js';
import ListEmptyView from '../view/list-empty-view.js';
import LoadingView from '../view/loading-view.js';
import SortView from '../view/sort-view.js';
import TripInfoView from '../view/trip-info-view.js';
import addPointPresenter from './add-point-presenter.js';
import PointPresenter from './point-presenter.js';
import UiBlocker from '../framework/ui-blocker/ui-blocker.js';

const TimeLimit = {
  LOWER_LIMIT: 350,
  UPPER_LIMIT: 1000,
};

const siteTripHeaderElement = document.querySelector('.trip-main');

export default class BoardPresenter {
  #boardContainer = null;
  #pointsModel = null;
  #filterModel = null;
  #destinations = [];

  #boardListComponent = new BoardView();
  #sortComponent = null;
  #tripInfoComponent = new TripInfoView();
  #loadingComponent = new LoadingView();
  #pointsPresenters = new Map();
  #currentSortType = SortTypes.DEFAULT;
  #listEmptyComponent = null;
  #filterType = FilterTypes.DEFAULT;
  #addPointPresenter = null;
  #isLoading = true;
  #uiBlocker = new UiBlocker(TimeLimit.LOWER_LIMIT, TimeLimit.UPPER_LIMIT);

  constructor(boardContainer, pointsModel, filterModel) {
    this.#boardContainer = boardContainer;
    this.#pointsModel = pointsModel;
    this.#filterModel = filterModel;

    this.#addPointPresenter = new addPointPresenter(this.#boardListComponent.element, this.#handleViewAction);

    this.#pointsModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
  }

  #handleViewAction = async (actionType, updateType, update) => {
    this.#uiBlocker.block();

    switch (actionType) {
      case UserActions.UPDATE_POINT:
        this.#pointsPresenters.get(update.id).setSaving();
        try {
          await this.#pointsModel.updatePoint(updateType, update);
        } catch (err) {
          this.#pointsPresenters.get(update.id).setAborting();
        }
        break;
      case UserActions.ADD_POINT:
        this.#addPointPresenter.setSaving();
        try {
          await this.#pointsModel.addPoint(updateType, update);
        } catch (err) {
          this.#addPointPresenter.setAborting();
        }
        break;
      case UserActions.DELETE_POINT:
        this.#pointsPresenters.get(update.id).setDeleting();
        try {
          await this.#pointsModel.deletePoint(updateType, update);
        } catch (err) {
          this.#pointsPresenters.get(update.id).setAborting();
        }
        break;
    }

    this.#uiBlocker.unblock();
  };

  #handleModelEvent = (updateType, data) => {
    switch (updateType) {
      case UpdateTypes.PATCH:
        this.#pointsPresenters.get(data.id).init(data, this.offers, this.destinations);
        break;
      case UpdateTypes.MINOR:
        this.#clearBoard();
        this.#renderBoard();
        break;
      case UpdateTypes.MAJOR:
        this.#clearBoard({resetSortType: true});
        this.#renderBoard();
        break;
      case UpdateTypes.INIT:
        this.#isLoading = false;
        remove(this.#loadingComponent);
        this.#renderBoard();
        break;
    }
  };

  #handleModeChange = () => {
    this.#addPointPresenter.destroy();
    this.#pointsPresenters.forEach((presenter) => presenter.resetView());
  };

  #renderTripInfo = () => {
    render(this.#tripInfoComponent, siteTripHeaderElement, RenderPosition.AFTERBEGIN);
  };

  #renderLoading = () => {
    render(this.#loadingComponent, this.#boardListComponent.element, RenderPosition.AFTERBEGIN);
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

  #renderPoint = (point, offers, destinations) => {
    const pointPresenter = new PointPresenter(this.#boardListComponent.element, this.#handleViewAction, this.#handleModeChange);
    pointPresenter.init(point, offers, destinations);
    this.#pointsPresenters.set(point.id, pointPresenter);
  };

  #renderNoPoints = () => {
    this.#listEmptyComponent = new ListEmptyView(this.#filterType);
    render(this.#listEmptyComponent, this.#boardListComponent.element);
  };

  #renderPoints = (points, offers, destinations) => {
    points.forEach((point) => this.#renderPoint(point, offers, destinations));
  };

  #clearBoard = ({ resetSortType = false } = {}) => {
    this.#addPointPresenter.destroy();
    this.#pointsPresenters.forEach((presenter) => presenter.destroy());
    this.#pointsPresenters.clear();

    remove(this.#sortComponent);
    remove(this.#listEmptyComponent);
    remove(this.#loadingComponent);

    if (resetSortType) {
      this.#currentSortType = SortTypes.DEFAULT;
    }
  };

  #renderBoard = () => {
    render(this.#boardListComponent, this.#boardContainer);

    if (this.#isLoading) {
      this.#renderLoading();
      return;
    }

    if (this.points.length === 0) {
      this.#renderNoPoints();
      return;
    }

    this.#renderTripInfo();
    this.#renderSort();

    this.#renderPoints(this.points, this.offers, this.destinations);
  };

  get points() {
    this.#filterType = this.#filterModel.filter;
    const points = this.#pointsModel.points;
    const filteredPoints = filters[this.#filterType](points);

    switch (this.#currentSortType) {
      case SortTypes.DEFAULT:
        return filteredPoints.sort(sortPointDay);
      case SortTypes.PRICE:
        return filteredPoints.sort(sortPointPrice);
      case SortTypes.TIME:
        return filteredPoints.sort(sortPointTime);
    }

    return filteredPoints;
  }

  get offers() {
    return this.#pointsModel.offers;
  }

  get destinations() {
    return this.#pointsModel.destinations;
  }

  init = () => {
    this.#renderBoard();
  };

  createPoint = (callback) => {
    this.#currentSortType = SortTypes.DEFAULT;
    this.#filterModel.setFilter(UpdateTypes.MAJOR, FilterTypes.DEFAULT);
    this.#addPointPresenter.init(callback, this.offers, this.destinations);
  };
}
