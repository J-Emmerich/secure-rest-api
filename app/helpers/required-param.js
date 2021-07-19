const RequireParamError = require("./error");

function requiredParam(param) {
try{
    throw new RequireParamError(param);
} catch (err){
    throw new RequireParamError(param);
}
}

module.exports = requiredParam;
