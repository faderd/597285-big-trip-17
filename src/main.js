import PointsModel from './model/points-model.js';
import BoardPresenter from './presenter/board-presenter.js';
import FilterModel from './model/filter-model.js';
import FilterPresenter from './presenter/filter-presenter.js';
import NewEventButtonView from './view/new-event-button-view.js';
import { render } from './framework/render.js';
import PointsApiService from './points-api-service.js';
import TripInfoPresenter from './presenter/trip-info-presenter.js';

const AUTHORIZATION = 'Basic er883jdzbdw';
const END_POINT = 'https://17.ecmascript.pages.academy/big-trip';

const siteFilterElement = document.querySelector('.trip-controls__filters');
const siteTripEventsElement = document.querySelector('.trip-events');

const siteTripHeaderElement = document.querySelector('.trip-main');

const pointsModel = new PointsModel(new PointsApiService(END_POINT, AUTHORIZATION));
const filterModel = new FilterModel();
const boardPresenter = new BoardPresenter(siteTripEventsElement, pointsModel, filterModel);
const filterPresenter = new FilterPresenter(siteFilterElement, filterModel, pointsModel);
const newEventButtonComponent = new NewEventButtonView();
const tripInfoPresenter = new TripInfoPresenter(pointsModel);

const handleNewEventFormClose = () => {
  newEventButtonComponent.element.disabled = false;
};

const handleNewEventButtonClick = () => {
  boardPresenter.createPoint(handleNewEventFormClose);
  newEventButtonComponent.element.disabled = true;
};

render(newEventButtonComponent, siteTripHeaderElement);
newEventButtonComponent.setClickHandler(handleNewEventButtonClick);
newEventButtonComponent.element.disabled = true;

filterPresenter.init();
boardPresenter.init();
tripInfoPresenter.init();

pointsModel.init(newEventButtonComponent)
  .finally(() => {
    newEventButtonComponent.element.disabled = false;
  });
