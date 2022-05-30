import PointsModel from './model/points-model.js';
import BoardPresenter from './presenter/board-presenter.js';
import FilterModel from './model/filter-model.js';
import FilterPresenter from './presenter/filter-presenter.js';
import newEventButtonView from './view/new-event-button-view.js';
import { render } from './framework/render.js';

const siteFilterElement = document.querySelector('.trip-controls__filters');
const siteTripEventsElement = document.querySelector('.trip-events');

const siteTripHeaderElement = document.querySelector('.trip-main');

const pointsModel = new PointsModel();
const filterModel = new FilterModel();
const boardPresenter = new BoardPresenter(siteTripEventsElement, pointsModel, filterModel);
const filterPresenter = new FilterPresenter(siteFilterElement, filterModel, pointsModel);
const newEventButtonComponent = new newEventButtonView();

const handleNewEventFormClose = () => {
  newEventButtonComponent.element.disabled = false;
};

const handleNewEventButtonClick = () => {
  boardPresenter.createPoint(handleNewEventFormClose);
  newEventButtonComponent.element.disabled = true;
};

render(newEventButtonComponent, siteTripHeaderElement);
newEventButtonComponent.setClickHandler(handleNewEventButtonClick);

filterPresenter.init();
boardPresenter.init();
