import BoardPresenter from './presenter/board-presenter.js';
import {
  render,
  RenderPosition,
} from './render.js';
import FilterView from './view/filter-view.js';
import SortView from './view/sort-view.js';
import TripInfoView from './view/trip-info-view.js';

const siteTripHeaderElement = document.querySelector('.trip-main');
const siteFilterElement = document.querySelector('.trip-controls__filters');
const siteTripEventsElement = document.querySelector('.trip-events');
const boardPresenter = new BoardPresenter();

render(new TripInfoView(), siteTripHeaderElement, RenderPosition.AFTERBEGIN);
render(new FilterView(), siteFilterElement);
render(new SortView(), siteTripEventsElement);

boardPresenter.init(siteTripEventsElement);
