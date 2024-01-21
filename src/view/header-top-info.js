import AbstractView from '../framework/view/abstract-view.js';
import { humanizeDate } from '../utilities/utilities.js';
import { DATE_FORMAT } from '../utilities/constants.js';

function headerInfoTemplate({model}) {
  function compileRouteInfo() {
    if (model.getPoint().length > 3) {
      const startPoint = model.getDestinationById(model.getPoint()[0].destination).name;
      const endPoint = model.getDestinationById(model.getPoint()[model.getPoint().length - 1].destination).name;
      const dashHellipDash = '&nbsp;&mdash;&nbsp;&hellip;&nbsp;&mdash;&nbsp;';

      return `${startPoint}${dashHellipDash}${endPoint}`;
    } else if (model.getPoint().length === 0) {

      return 'Design your jorney. Make first point!';
    }
    return model.getPoint().map((point) =>
      `${model.getDestinationById(point.destination).name}`).join('&nbsp;&mdash;&nbsp;');
  }

  function compileRouteTime() {
    const dateFrom = humanizeDate(model.getPoint()[0].dateFrom, DATE_FORMAT.monthDay);
    const dateTo = humanizeDate(model.getPoint()[model.getPoint().length - 1].dateTo, DATE_FORMAT.monthDay);

    // дописать проверку model.getPoint().length === 1 // стартовое время [0] даты
    // дописать проверку model.getPoint().length === 0 // ''
    // когда массив points пустой, сайт падает и Cannot read properties of undefined (reading 'dateFrom')

    return `${dateFrom}&nbsp;&mdash;&nbsp${dateTo}`;
  }

  function getPointSum (point) {
    const pointOffersSum = point.offers.reduce((acc, offer) => acc + model.getOfferPriceById(offer, point.type), 0);

    return point.basePrice + pointOffersSum;
  }

  function getRouteSum () {
    return model.getPoint().reduce((acc, point) => acc + getPointSum(point), 0);
  }



  return (
    `<section class="trip-main__trip-info  trip-info">
      <div class="trip-info__main">
        <h1 class="trip-info__title">${compileRouteInfo()}</h1>

        <p class="trip-info__dates">${compileRouteTime()}</p>
      </div>

      <p class="trip-info__cost">
        Total: &euro;&nbsp;<span class="trip-info__cost-value">${getRouteSum()}</span>
      </p>
    </section>`
  );
}

export default class HeaderTopInfo extends AbstractView {
  constructor (pointModel) {
    super();

    this.pointModel = pointModel;
  }

  get template() {
    return headerInfoTemplate({model: this.pointModel});
  }
}
