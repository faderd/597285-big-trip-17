import { nanoid } from 'nanoid';
import { UpdateTypes, UserActions } from '../const';
import { remove, render, RenderPosition } from '../framework/render.js';
import { isEscapeKey } from '../utils/common';
import EditPointView from '../view/edit-point-view.js';

export default class addPointPresenter {
  #pointsListContainer = null;
  #changeData = null;
  #editPointComponent = null;
  #destroyCallback = null;

  constructor(pointsListContainer, changeData) {
    this.#pointsListContainer = pointsListContainer;
    this.#changeData = changeData;
  }

  init = (callback, allOffers, destinations) => {
    this.#destroyCallback = callback;

    if (this.#editPointComponent !== null) {
      return;
    }

    this.#editPointComponent = new EditPointView(undefined, allOffers, destinations);
    this.#editPointComponent.setFormSubmitHandler(this.#handleFormSubmit);
    this.#editPointComponent.setDeleteClickHandler(this.#handleDeleteClick);

    render(this.#editPointComponent, this.#pointsListContainer, RenderPosition.AFTERBEGIN);

    document.addEventListener('keydown', this.#escapeKeyDownHandler);
  };

  destroy = () => {
    if (this.#editPointComponent === null) {
      return;
    }

    this.#destroyCallback?.();

    remove(this.#editPointComponent);
    this.#editPointComponent = null;

    document.removeEventListener('keydown', this.#escapeKeyDownHandler);
  };

  #handleFormSubmit = (point) => {
    this.#changeData(
      UserActions.ADD_POINT,
      UpdateTypes.MINOR,

      {id: nanoid(), ...point},
    );

    this.destroy();
  };

  #handleDeleteClick = () => {
    this.destroy();
  };

  #escapeKeyDownHandler = (evt) => {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      this.destroy();
    }
  };
}