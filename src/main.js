import PointsModel from './model/points-model.js';
import BoardPresenter from './presenter/board-presenter.js';
import {
  render,
} from './framework/render.js';
import FilterView from './view/filter-view.js';
import { filters, } from './utils/filter.js';

const siteFilterElement = document.querySelector('.trip-controls__filters');
const siteTripEventsElement = document.querySelector('.trip-events');
const pointsModel = new PointsModel();
const boardPresenter = new BoardPresenter(siteTripEventsElement, pointsModel);

render(new FilterView(Object.keys(filters)), siteFilterElement);

boardPresenter.init();
