const ErrorMessages = require("./ErrorMessages");

class CheckerError extends Error {
  constructor(message) {
    super(message);
    this.name = ErrorMessages.CheckerErrorName;
  }
}
module.exports = CheckerError;
