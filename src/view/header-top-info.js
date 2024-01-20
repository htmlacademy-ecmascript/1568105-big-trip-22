import AbstractView from '../framework/view/abstract-view.js';
{/* <h1 class="trip-info__title">Amsterdam &mdash; Chamonix &mdash; Geneva</h1> */}

function headerInfoTemplate({model}) {
  function createRouteInfo() {
    // return model.getPoint().map((point) =>
    //   `${model.getDestinationById(point.destination).name}`).join('&nbsp;&mdash;&nbsp;');

    let startPoint = model.getPoint()[0].destination;  // *<<<

    if (model.getPoint().length > 3) {
      return `${startPoint}`;
    }
    return '&nbsp;&mdash;&nbsp;';
  }

  return (
    `<section class="trip-main__trip-info  trip-info">
      <div class="trip-info__main">
        <h1 class="trip-info__title">${createRouteInfo()}</h1>

        <p class="trip-info__dates">18&nbsp;&mdash;&nbsp;20 Mar</p>
      </div>

      <p class="trip-info__cost">
        Total: &euro;&nbsp;<span class="trip-info__cost-value">1230</span>
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
