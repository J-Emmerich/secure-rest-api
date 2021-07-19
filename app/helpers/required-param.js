const RequireParamError = require("./error");

function requiredParam(param) {
  try {
      throw new RequireParamError(param);
  }
  catch(err) {
      console.log("This is so ambiguous", err.message);
  }
    }

module.exports = requiredParam;
