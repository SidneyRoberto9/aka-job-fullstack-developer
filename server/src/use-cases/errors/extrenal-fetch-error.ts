export class ExternalFetchError extends Error {
  constructor() {
    super('External fetch error');
    this.name = 'ExternalFetchError';
  }
}
