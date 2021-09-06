// This file validates the object that goes into the DB. All validation ocurrs here, not in DB-layer.

const {
  InvalidTypeError,
  RequiredParameterError,
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
// This function returns a valid player independently of the database.
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
      dateOfRegister: validTime,
    };
    return Object.freeze(player);
  } catch (err) {
    return err;
  }
}

module.exports = makePlayer;
/*

    Business logic player : 
    To throw the dices the players must register himself with a unique name. 
    If he doesn't provides a name then he's name will be anonymous
    When we create a player he receives an ID and a data of register
    He can access the results of all his games and a % of victories.
*/
