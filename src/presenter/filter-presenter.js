import { FilterTypes, UpdateTypes } from '../const.js';
import { remove, render, replace } from '../framework/render.js';
import { filters } from '../utils/filter.js';
import FilterView from '../view/filter-view.js';

export default class FilterPresenter {
  #filterContainer = null;
  #filterModel = null;
  #pointsModel = null;

  #filterComponent = null;

  constructor(filterContainer, filterModel, pointsModel) {
    this.#filterContainer = filterContainer;
    this.#filterModel = filterModel;
    this.#pointsModel = pointsModel;

    this.#pointsModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
  }

  get filters() {
    const points = this.#pointsModel.points;

    return [
      {
        type: FilterTypes.EVERYTHING,
        name: 'everything',
        count: filters[FilterTypes.EVERYTHING](points).length,
      },
      {
        type: FilterTypes.PAST,
        name: 'past',
        count: filters[FilterTypes.PAST](points).length,
      },
      {
        type: FilterTypes.FUTURE,
        name: 'future',
        count: filters[FilterTypes.FUTURE](points).length,
      },
    ];
  }

  init = () => {
    const allFilters = this.filters;
    const prevFilterComponent = this.#filterComponent;

    this.#filterComponent = new FilterView(allFilters, this.#filterModel.filter);
    this.#filterComponent.setFilterTypeChangeHandler(this.#handleFilterTypeChange);

    if (prevFilterComponent === null) {
      render(this.#filterComponent, this.#filterContainer);
      return;
    }

    replace(this.#filterComponent, prevFilterComponent);
    remove(prevFilterComponent);
  };

  #handleModelEvent = () => {
    this.init();
  };

  #handleFilterTypeChange = (filterType) => {
    if (this.#filterModel.filter === filterType) {
      return;
    }

    this.#filterModel.setFilter(UpdateTypes.MAJOR, filterType);
  };
}
