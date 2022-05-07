import {
  render,
  RenderPosition,
} from '../render.js';
import BoardView from '../view/board-view.js';
import PointView from '../view/point-view.js';
import EditPointView from '../view/edit-point-view.js';
import { isEscapeKey } from '../view/utils.js';
import ListEmptyView from '../view/list-empty-view.js';
import SortView from '../view/sort-view.js';
import TripInfoView from '../view/trip-info-view.js';

const siteTripHeaderElement = document.querySelector('.trip-main');

export default class BoardPresenter {
  #boardContainer = null;
  #pointsModel = null;
  #boardPoints = [];
  #offers = [];

  #boardListComponent = new BoardView();

  constructor(boardContainer, pointsModel) {
    this.#boardContainer = boardContainer;
    this.#pointsModel = pointsModel;
  }

  #renderPoint = (point) => {
    const pointComponent = new PointView(point, this.#offers);

    const pointEditComponent = new EditPointView(point, this.#offers);

    const replaceLineToForm = () => {
      this.#boardListComponent.element.replaceChild(pointEditComponent.element, pointComponent.element);
    };

    const replaceFormToLine = () => {
      this.#boardListComponent.element.replaceChild(pointComponent.element, pointEditComponent.element);
    };

    const escapeKeyDownHandler = (evt) => {
      if (isEscapeKey(evt)) {
        evt.preventDefault();
        replaceFormToLine();
        document.removeEventListener('keydown', escapeKeyDownHandler);
      }
    };

    pointComponent.element.querySelector('.event__rollup-btn').addEventListener('click', () => {
      replaceLineToForm();
      document.addEventListener('keydown', escapeKeyDownHandler);
    });

    pointEditComponent.element.querySelector('form').addEventListener('submit', (evt) => {
      evt.preventDefault();
      replaceFormToLine();
      document.removeEventListener('keydown', escapeKeyDownHandler);
    });

    render(pointComponent, this.#boardListComponent.element);
  };

  init = () => {
    this.#boardPoints = [...this.#pointsModel.points];
    this.#offers = this.#pointsModel.offers;

    this.#renderBoard();
  };

  #renderBoard = () => {
    render(this.#boardListComponent, this.#boardContainer);

    if (this.#boardPoints.length === 0) {
      render(new ListEmptyView('Past'), this.#boardListComponent.element);
      return;
    }

    render(new TripInfoView(), siteTripHeaderElement, RenderPosition.AFTERBEGIN);
    render(new SortView(), this.#boardContainer, RenderPosition.AFTERBEGIN);

    this.#boardPoints.forEach((point) => {
      this.#renderPoint(point);
    });
  };
}
