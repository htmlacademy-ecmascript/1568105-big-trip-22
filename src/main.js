import PointModel from './model/point-model.js';
import FilterModel from './model/filter-model.js';
import HeaderTopInfoPresenter from './presenter/header-top-info-presenter.js';
import HeaderFilterPresenter from './presenter/header-filter-presenter.js';
import MainPresenter from './presenter/main-presenter.js';

const headerTripMainElement = document.querySelector('.trip-main');
const headerTripMainFiltersElement = document.querySelector('.trip-controls__filters');
const mainContainer = document.querySelector('.trip-events');

const pointModel = new PointModel();
const filterModel = new FilterModel();
const headerTopInfoPresenter = new HeaderTopInfoPresenter({headerTripMainElement});
const headerFilterPresenter = new HeaderFilterPresenter({headerTripMainFiltersElement, filterModel});
const mainPresenter = new MainPresenter({mainContainer, pointModel, filterModel});

headerTopInfoPresenter.init({ pointModel });
headerFilterPresenter.init();
mainPresenter.init();

pointModel.addObserver(() => {
  headerTopInfoPresenter.init({ pointModel });
});
