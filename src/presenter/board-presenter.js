import {
  render,
  RenderPosition,
  replace,
} from '../framework/render.js';
import BoardView from '../view/board-view.js';
import PointView from '../view/point-view.js';
import EditPointView from '../view/edit-point-view.js';
import { isEscapeKey } from '../utils/common.js';
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
      replace(pointEditComponent, pointComponent);
    };

    const replaceFormToLine = () => {
      replace(pointComponent, pointEditComponent);
    };

    const escapeKeyDownHandler = (evt) => {
      if (isEscapeKey(evt)) {
        evt.preventDefault();
        replaceFormToLine();
        document.removeEventListener('keydown', escapeKeyDownHandler);
      }
    };

    pointComponent.setEditClickHandler(() => {
      replaceLineToForm();
      document.addEventListener('keydown', escapeKeyDownHandler);
    });

    pointEditComponent.setFormSubmitHandler(() => {
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
