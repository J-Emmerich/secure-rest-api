// This file validates the object that goes into the DB. All validation ocurrs here, not in DB-layer.

const {
  InvalidTypeError,
  RequiredParameterError
} = require("../../helpers/error");

function isString(rawId) {
  if (typeof rawId !== "string" && rawId !== null)
    throw new InvalidTypeError(rawId, "string");
  return rawId;
}
function nameValidation(notValidatedName) {
  if (
    notValidatedName === undefined ||
    notValidatedName === null ||
    notValidatedName === ""
  ) {
    const validName = "anonymous";
    return validName;
  }
  const validName = notValidatedName;
  return validName;
}

async function makePlayer({ id, name = "anonymous", dateOfRegister } = {}) {
  try {
    // eslint-disable-next-line eqeqeq
    if (id == undefined) throw new RequiredParameterError(id);
    // eslint-disable-next-line eqeqeq
    if (dateOfRegister == undefined) throw new RequiredParameterError(id);
    const validId = isString(id);
    const validName = nameValidation(isString(name));
    const validTime = isString(dateOfRegister);
    const player = {
      id: validId,
      name: validName,
      dateOfRegister: validTime
    };
    return Object.freeze(player);
  } catch (err) {
    return err;
  }
}

module.exports = makePlayer;
