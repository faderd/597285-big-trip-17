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

    render(this.boardListComponent, this.boardContainer);

    render(new EditPointView(this.boardPoints[0], this.offers), this.boardListComponent.getElement());

    for (let i = 1; i < this.boardPoints.length; i++) {
      render(new PointView(this.boardPoints[i], this.offers), this.boardListComponent.getElement());
    }
  };
}
