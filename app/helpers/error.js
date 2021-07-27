class RequiredParameterError extends Error {
  constructor(param) {
    super(`${param} can not be null or undefined.`);
    this.name = "RequiredParameterError";
  }
}

class InvalidTypeError extends Error {
  constructor(param, expected) {
    super(`${typeof param} is not accepted. You should use ${expected} `);
    this.name = "InvalidTypeError";
  }
}

module.exports = { RequiredParameterError, InvalidTypeError };
