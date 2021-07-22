const {
  InvalidTypeError,
  RequiredParameterError
} = require("../helpers/error");

// This function returns a valid user independently of the database.
async function makeUser({ id, name = "anonymous", dateOfRegister } = {}) {
  try {
    // eslint-disable-next-line eqeqeq
    if (id == undefined) throw new RequiredParameterError(id);
    // eslint-disable-next-line eqeqeq
    if (dateOfRegister == undefined) throw new RequiredParameterError(id);
    const validId = isString(id);
    const validName = isString(name);

    const user = {
      id: validId,
      name: validName,
      dateOfRegister
    };
    return Object.freeze(user);
  } catch (err) {
    return err.message;
  }
  function isString(rawId) {
    if (typeof rawId !== "string") throw new InvalidTypeError(rawId);
    return rawId;
  }
}

module.exports = makeUser;
/*

    Business logic player : 
    To throw the dices the players must register himself with a unique name. 
    If he doesn't provides a name then he's name will be anonymous
    When we create a player he receives an ID and a data of register
    He can access the results of all his games and a % of victories.
*/
