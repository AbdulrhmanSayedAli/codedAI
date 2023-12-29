import { CheckerErrorName } from './ErrorMessages';

class CheckerError extends Error {
  constructor (message) {
    super(message);
    this.name = CheckerErrorName;
  }
}
export default CheckerError;
