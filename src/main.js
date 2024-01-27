import PointModel from './model/point-model.js';
import FilterModel from './model/filter-model.js';
import HeaderTopInfoPresenter from './presenter/header-top-info-presenter.js';
import HeaderFilterPresenter from './presenter/header-filter-presenter.js';
import MainPresenter from './presenter/main-presenter.js';
import PointApiService from './service/point-api-service.js';

const END_POINT = 'https://22.objects.htmlacademy.pro/big-trip';
const AUTHORIZATION = 'Basic w43232344428hS23';
const pointApiService = new PointApiService(END_POINT, AUTHORIZATION);

const headerTripMainElement = document.querySelector('.trip-main');
const headerTripMainFiltersElement = document.querySelector('.trip-controls__filters');
const mainContainer = document.querySelector('.trip-events');

const pointModel = new PointModel({
  service: pointApiService
});

pointModel.init()
  .then(() => {
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
  })
