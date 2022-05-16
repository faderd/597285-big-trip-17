import PointView from '../view/point-view.js';
import EditPointView from '../view/edit-point-view.js';
import { isEscapeKey } from '../utils/common.js';
import { remove, render, replace, } from '../framework/render.js';

const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
};

export default class PointPresenter {
  #pointComponent = null;
  #pointEditComponent = null;
  #pointsListContainer = null;
  #point = null;
  #mode = Mode.DEFAULT;
  #offers = [];
  #handleChangeData = null;
  #handleChangeMode = null;

  constructor(pointsListContainer, handleChangeData, handleChangeMode) {
    this.#pointsListContainer = pointsListContainer;
    this.#handleChangeData = handleChangeData;
    this.#handleChangeMode = handleChangeMode;
  }

  #replaceLineToForm = () => {
    replace(this.#pointEditComponent, this.#pointComponent);
    document.addEventListener('keydown', this.#escapeKeyDownHandler);
    this.#mode = Mode.EDITING;
  };

  #replaceFormToLine = () => {
    replace(this.#pointComponent, this.#pointEditComponent);
    document.removeEventListener('keydown', this.#escapeKeyDownHandler);
    this.#mode = Mode.DEFAULT;
  };

  #escapeKeyDownHandler = (evt) => {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      this.#replaceFormToLine();
    }
  };

  #handleFavoriteClick = () => {
    this.#handleChangeData({...this.#point, isFavorite: !this.#point.isFavorite});
  };

  #handleEditClick = () => {
    this.#replaceLineToForm();
  };

  #handleFormSubmit = (point) => {
    this.#handleChangeData(point);
    this.#replaceFormToLine();
  };

  init = (point, offers) => {
    this.#point = point;
    this.#offers = offers;

    const prevPointComponent = this.#pointComponent;
    const prevPointEditComponent = this.#pointEditComponent;

    this.#pointComponent = new PointView(this.#point, this.#offers);
    this.#pointEditComponent = new EditPointView(this.#point, this.#offers);

    this.#pointComponent.setEditClickHandler(this.#handleEditClick);
    this.#pointComponent.setFavoriteClickHandler(this.#handleFavoriteClick);
    this.#pointEditComponent.setFormSubmitHandler(this.#handleFormSubmit);

    if (prevPointComponent === null || prevPointEditComponent === null) {
      render(this.#pointComponent, this.#pointsListContainer);
      return;
    }

    if (this.#mode === Mode.DEFAULT) {
      replace(this.#pointComponent, prevPointComponent);
    }

    if (this.#mode === Mode.EDITING) {
      replace(this.#pointEditComponent, prevPointEditComponent);
    }

    remove(prevPointComponent);
    remove(prevPointEditComponent);
  };

  destroy = () => {
    remove(this.#pointComponent);
    remove(this.#pointEditComponent);
  };

  resetView = () => {
    if (this.#mode !== Mode.DEFAULT) {
      this.#replaceFormToLine();
    }
  };
}
