import {
  render,
} from '../render.js';
import BoardView from '../view/board-view.js';
import PointView from '../view/point-view.js';
import EditPointView from '../view/edit-point-view.js';

export default class BoardPresenter {
  boardListComponent = new BoardView();

  init = (boardContainer, pointsModel) => {
    this.boardContainer = boardContainer;
    this.pointsModel = pointsModel;
    this.boardPoints = [...this.pointsModel.getPoints()];
    this.offers = this.pointsModel.getOffers();

    const [firstPoint, ...otherPoints] = this.boardPoints;

    render(this.boardListComponent, this.boardContainer);

    render(new EditPointView(firstPoint, this.offers), this.boardListComponent.getElement());

    otherPoints.forEach((point) => {
      render(new PointView(point, this.offers), this.boardListComponent.getElement());
    });
  };
}
