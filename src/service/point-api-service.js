import ApiService from '../framework/api-service.js';
import { EndPoints, Method } from '../utilities/constants.js';

export default class PointApiService extends ApiService {
  get points() {
    return this._load({ url: EndPoints.POINTS })
      .then(ApiService.parseResponse);
  }

  get destinations() {
    return this._load({ url: EndPoints.DESTINATIONS })
      .then(ApiService.parseResponse);
  }

  get offers() {
    return this._load({ url: EndPoints.OFFERS })
      .then(ApiService.parseResponse);
  }

  async updatePoint(point) {
    const response = await this._load({
      url: `${EndPoints.POINTS}/${point.id}`,
      method: Method.PUT,
      body: JSON.stringify(this.#adaptToServer(point)),
      headers: new Headers({ 'Content-Type': 'application/json' }),
    });

    const parsedResponse = await ApiService.parseResponse(response);

    return parsedResponse;
  }

  async addPoint(point) {
    const response = await this._load({
      url: EndPoints.POINTS,
      method: Method.POST,
      body: JSON.stringify(this.#adaptToServer(point)),
      headers: new Headers({ 'Content-Type': 'application/json' }),
    });

    const parsedResponse = await ApiService.parseResponse(response);

    return parsedResponse;
  }

  async deletePoint(pointId) {
    const response = await this._load({
      url: `${EndPoints.POINTS}/${pointId}`,
      method: Method.DELETE,
      headers: new Headers({ 'Content-Type': 'application/json' }),
    });
  }

  #adaptToServer(point) {
    const adaptedPoint = {
      ...point,
      'base_price': Number(point.basePrice),
      'date_from': point.dateFrom,
      'date_to': point.dateTo,
      'is_favorite': point.isFavorite,
    };

    if (point.id === 0) {
      delete adaptedPoint.id;
    }
    delete adaptedPoint.basePrice;
    delete adaptedPoint.dateFrom;
    delete adaptedPoint.dateTo;
    delete adaptedPoint.isFavorite;

    return adaptedPoint;
  }
}
