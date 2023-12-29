import ErrorMessages from './ErrorMessages.js';

class CheckerError extends Error {
  constructor (message) {
    super(message);
    this.name = ErrorMessages.CheckerErrorName;
  }
}
export default CheckerError;
