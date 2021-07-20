const RequireParamError = require("./error");

function requiredParam(param) {
  try {
    throw new RequireParamError(param);
  } catch (err) {
    console.log(err.message);
  }
}

module.exports = requiredParam;
