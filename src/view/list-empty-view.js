import { ListEmptyMessages, } from '../const.js';
import { createElement, } from '../render.js';

const createListEmptyTemplate = (filterValue) => {
  const message = ListEmptyMessages[filterValue.toUpperCase()];
  return (
    `<p class="trip-events__msg">${message}</p>`
  );
};

export default class ListEmptyView {
  #element = null;

  constructor(filterValue) {
    this.filterValue = filterValue;
  }

  get template() {
    return createListEmptyTemplate(this.filterValue);
  }

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  removeElement() {
    this.#element = null;
  }
}
