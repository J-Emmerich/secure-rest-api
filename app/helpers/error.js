class RequiredParameterError extends Error {
  constructor(param) {
    super(`${param} can not be null or undefined.`);
    this.name = "RequiredParameterError";
  }
}

class InvalidTypeError extends Error {
  constructor(param) {
    super(`${param} can't be of type ${typeof param}`);
    this.name = "InvalidTypeError";
  }
}

module.exports = { RequiredParameterError, InvalidTypeError };
