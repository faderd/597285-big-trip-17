import {
  render,
} from '../render.js';
import BoardView from '../view/board-view.js';
import PointView from '../view/point-view.js';
import EditPointView from '../view/edit-point-view.js';

export default class BoardPresenter {
  boardListComponent = new BoardView();

  init = (boardContainer) => {
    this.boardContainer = boardContainer;

    render(this.boardListComponent, this.boardContainer);

    render(new EditPointView(), this.boardListComponent.getElement());

    for (let i = 0; i < 3; i++) {
      render(new PointView(), this.boardListComponent.getElement());
    }

  };
}
