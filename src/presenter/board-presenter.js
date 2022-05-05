import {
  render,
} from '../render.js';
import BoardView from '../view/board-view.js';
import PointView from '../view/point-view.js';
import EditPointView from '../view/edit-point-view.js';

export default class BoardPresenter {
  #boardContainer = null;
  #pointsModel = null;
  #boardPoints = [];
  #offers = [];

  #boardListComponent = new BoardView();

  init = (boardContainer, pointsModel) => {
    this.#boardContainer = boardContainer;
    this.#pointsModel = pointsModel;
    this.#boardPoints = [...this.#pointsModel.points];
    this.#offers = this.#pointsModel.offers;

    const [firstPoint, ...otherPoints] = this.#boardPoints;

    render(this.#boardListComponent, this.#boardContainer);

    render(new EditPointView(firstPoint, this.#offers), this.#boardListComponent.element);

    otherPoints.forEach((point) => {
      render(new PointView(point, this.#offers), this.#boardListComponent.element);
    });
  };
}
