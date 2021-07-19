class RequiredParameterError extends Error {
  constructor(param) {
    super(`${param} can not be null or undefined.`);
    this.name = "RequiredParameterError";
  }
}

module.exports = RequiredParameterError;
