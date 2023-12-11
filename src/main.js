import { render, RenderPosition } from './render.js';

import HeaderInfoView from './view/header-info-view.js';
import FilterListView from './view/filter-list-view.js';

import EventsPresenter from './presenter/events-presenter.js';

const pageHeaderElement = document.querySelector('.page-header');
const pageHeaderMainElement = pageHeaderElement.querySelector('.trip-main');
const filterElement = pageHeaderElement.querySelector('.trip-controls__filters');
const tripEventsContainer = document.querySelector('.trip-events');
const eventsPresenter = new EventsPresenter({eventsContainer: tripEventsContainer});

render(new HeaderInfoView(), pageHeaderMainElement, RenderPosition.AFTERBEGIN);
render(new FilterListView(), filterElement);

eventsPresenter.init();
