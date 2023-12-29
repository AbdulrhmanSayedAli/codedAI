import { CheckerErrorName } from './ErrorMessages.js';

class CheckerError extends Error {
  constructor (message) {
    super(message);
    this.name = CheckerErrorName;
  }
}
export default CheckerError;
