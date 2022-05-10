import { ListEmptyMessages, } from '../const.js';
import AbstractView from '../framework/view/abstract-view.js';

const createListEmptyTemplate = (filterValue) => {
  const message = ListEmptyMessages[filterValue.toUpperCase()];
  return (
    `<p class="trip-events__msg">${message}</p>`
  );
};

export default class ListEmptyView extends AbstractView {
  #filterValue = null;

  constructor(filterValue) {
    super();
    this.#filterValue = filterValue;
  }

  get template() {
    return createListEmptyTemplate(this.#filterValue);
  }
}
