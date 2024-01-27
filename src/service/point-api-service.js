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
      body: JSON.stringify(point),
      headers: new Headers({ 'Content-Type': 'application/json' }),
    });

    const parsedResponse = await ApiService.parseResponse(response);

    return parsedResponse;
  }

  async addPoint(point) {
    const response = await this._load({
      url: `${EndPoints.POINTS}`,
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
    const adaptedPoint = {...point,
      // 'due_date': task.dueDate instanceof Date ? task.dueDate.toISOString() : null, // На сервере дата хранится в ISO формате
      // 'is_archived': task.isArchive,
      // 'is_favorite': task.isFavorite,
      // 'repeating_days': task.repeating,
    };

    // // Ненужные ключи мы удаляем
    // delete adaptedTask.dueDate;
    // delete adaptedTask.isArchive;
    // delete adaptedTask.isFavorite;
    // delete adaptedTask.repeating;

    return adaptedPoint;
  }

}