const requiredParam = require("../helpers/required-param");

// This function returns a valid user independently of the database.
async function makeUser({
  // id,
  id = requiredParam("id"),
  name = "anonymous",
  dateOfRegister = requiredParam("date of register"),
} = {}) {
  try {
    const user = {
      id,
      name,
      dateOfRegister,
    };
    return Object.freeze(user);
  } catch (err) {
    return err.message;
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
