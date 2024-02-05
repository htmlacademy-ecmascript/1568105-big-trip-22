import AbstractView from '../framework/view/abstract-view.js';
import { humanizeDate } from '../utilities/utilities.js';
import { DATE_FORMAT } from '../utilities/constants.js';

function headerInfoTemplate({model, points}) {
  function compileRouteInfo() {
    if (points.length > 3) {
      const startPoint = model.getDestinationById(points[0].destination).name;
      const endPoint = model.getDestinationById(points[points.length - 1].destination).name;
      const dashHellipDash = '&nbsp;&mdash;&nbsp;&hellip;&nbsp;&mdash;&nbsp;';

      return `${startPoint}${dashHellipDash}${endPoint}`;
    }

    return points.map((point) =>
      `${model.getDestinationById(point.destination).name}`).join('&nbsp;&mdash;&nbsp;');
  }

  function compileRouteTime() {
    const dateFrom = humanizeDate(points[0].dateFrom, DATE_FORMAT.dayMonth);
    const dateTo = humanizeDate(points[points.length - 1].dateTo, DATE_FORMAT.dayMonth);
    return `${dateFrom}&nbsp;&mdash;&nbsp${dateTo}`;
  }

  function getPointSum (point) {
    const pointOffersSum = point.offers.reduce((acc, offer) => acc + model.getOfferPriceById(offer, point.type), 0);
    return point.basePrice + pointOffersSum;
  }

  function getRouteSum () {
    return points.reduce((acc, point) => acc + getPointSum(point), 0);
  }

  return (
    `${!model.isLoadingError && !model.isLoading && `<section class="trip-main__trip-info  trip-info">
      <div class="trip-info__main">
        <h1 class="trip-info__title">${points.length ? compileRouteInfo() : 'Design your jorney. Make first point!'}</h1>
        <p class="trip-info__dates">${points.length ? compileRouteTime() : ''}</p>
      </div>
      <p class="trip-info__cost">
        Total: &euro;&nbsp;<span class="trip-info__cost-value">${points.length ? getRouteSum() : '0'}</span>
      </p>
    </section>`}`
  );
}

export default class HeaderTopInfo extends AbstractView {
  constructor ({model, points}) {
    super();

    this.pointModel = model;
    this.points = points;
  }

  get template() {
    return headerInfoTemplate({model: this.pointModel, points: this.points});
  }
}
