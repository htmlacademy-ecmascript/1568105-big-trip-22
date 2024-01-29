import PointModel from './model/point-model.js';
import FilterModel from './model/filter-model.js';
import HeaderTopInfoPresenter from './presenter/header-top-info-presenter.js';
import HeaderFilterPresenter from './presenter/header-filter-presenter.js';
import MainPresenter from './presenter/main-presenter.js';
import PointApiService from './service/point-api-service.js';
import { END_POINT, AUTHORIZATION } from './utilities/constants.js';

const pointApiService = new PointApiService(END_POINT, AUTHORIZATION);

const headerTripMainElement = document.querySelector('.trip-main');
const headerTripMainFiltersElement = document.querySelector('.trip-controls__filters');
const mainContainer = document.querySelector('.trip-events');

const pointModel = new PointModel({
  service: pointApiService
});

const filterModel = new FilterModel();
const headerTopInfoPresenter = new HeaderTopInfoPresenter({headerTripMainElement});
const headerFilterPresenter = new HeaderFilterPresenter({headerTripMainFiltersElement, filterModel, pointModel});
const mainPresenter = new MainPresenter({mainContainer, pointModel, filterModel});

pointModel.init()
  .then(() => {
    headerTopInfoPresenter.init({ pointModel });
    pointModel.addObserver(() => {
      headerTopInfoPresenter.init({ pointModel });
    });
  })

  .finally(() => {
    headerFilterPresenter.init();

    mainPresenter.init();
  });
