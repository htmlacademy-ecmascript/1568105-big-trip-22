import PointModel from './model/point-model.js';
import HeaderTopInfoPresenter from './presenter/header-top-info-presenter.js';
import HeaderFilterPresenter from './presenter/header-filter-presenter.js';
import MainPresenter from './presenter/main-presenter.js';

const headerTripMainElement = document.querySelector('.trip-main');
const headerTripMainFiltersElement = document.querySelector('.trip-controls__filters');
const mainContainer = document.querySelector('.trip-events');

const pointModel = new PointModel();
const headerTopInfoPresenter = new HeaderTopInfoPresenter({headerTripMainElement});
const headerFilterPresenter = new HeaderFilterPresenter({headerTripMainFiltersElement});
const mainPresenter = new MainPresenter({mainContainer, pointModel});

headerTopInfoPresenter.init({ pointModel });
headerFilterPresenter.init();
mainPresenter.init();
