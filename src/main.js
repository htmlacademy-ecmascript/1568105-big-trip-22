import { render, RenderPosition } from './render.js';

import HeaderInfoView from './view/header-info-view.js';
import FilterListView from './view/filter-list-view.js';

import TripPresenter from './presenter/trip-presenter.js';

const pageHeaderElement = document.querySelector('.page-header');
const pageHeaderMainElement = pageHeaderElement.querySelector('.trip-main');
const filterElement = pageHeaderElement.querySelector('.trip-controls__filters');
const tripEventsContainer = document.querySelector('.trip-events');
const tripPresenter = new TripPresenter({tripContainer: tripEventsContainer});

render(new HeaderInfoView(), pageHeaderMainElement, RenderPosition.AFTERBEGIN);
render(new FilterListView(), filterElement);

tripPresenter.init();
