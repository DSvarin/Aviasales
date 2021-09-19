/* eslint-disable no-underscore-dangle */
export default class AviasalesService {
  _apiBase = 'https://front-test.beta.aviasales.ru/';

  async getSearchId() {
    const response = await fetch(`${this._apiBase}search`);
    if (!response.ok) {
      throw new Error(`Could not fetch ${this._apiBase}search, received ${response.status}`);
    }
    const jsonresp = await response.json();
    return jsonresp.searchId;
  }

  async getTickets(Id, oldTickets = []) {
    const response = await fetch(`${this._apiBase}tickets?searchId=${Id}`);

    if (!response.ok && response.status === 500) {
      return this.getTickets(Id, oldTickets);
    }
    const jsonresp = await response.json();
    const ticketsArr = [...oldTickets, ...jsonresp.tickets];

    if (!jsonresp.stop) {
      return this.getTickets(Id, ticketsArr);
    }
    return ticketsArr;
  }
}
