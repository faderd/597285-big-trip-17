import PointsModel from './model/points-model.js';
import BoardPresenter from './presenter/board-presenter.js';
import FilterModel from './model/filter-model.js';
import FilterPresenter from './presenter/filter-presenter.js';

const siteFilterElement = document.querySelector('.trip-controls__filters');
const siteTripEventsElement = document.querySelector('.trip-events');
const pointsModel = new PointsModel();
const filterModel = new FilterModel();
const boardPresenter = new BoardPresenter(siteTripEventsElement, pointsModel, filterModel);
const filterPresenter = new FilterPresenter(siteFilterElement, filterModel, pointsModel);

filterPresenter.init();
boardPresenter.init();
