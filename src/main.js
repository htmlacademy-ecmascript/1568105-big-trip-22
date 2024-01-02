import HeaderTopInfoPresenter from './presenter/header-top-info-presenter.js';
import HeaderFilterPresenter from './presenter/header-filter-presenter.js';
import MainPresenter from './presenter/main-presenter.js';

const mainContainer = document.querySelector('.trip-events');
const headerTripMainElement = document.querySelector('.trip-main');
const headerTripMainFiltersElement = document.querySelector('.trip-controls__filters');

const headerTopInfoPresenter = new HeaderTopInfoPresenter({headerTripMainElement});
const headerFilterPresenter = new HeaderFilterPresenter({headerTripMainFiltersElement});
const mainPresenter = new MainPresenter({mainContainer});

headerTopInfoPresenter.init();
headerFilterPresenter.init();
mainPresenter.init();
