/*
This is the client API that calls the (Adapter)- DataLayer
This are functions that deals with the entities. 
It's paired with user-controller. Both are on the same architectural level.
*/

const { v4: uuidv4 } = require("uuid");
const getCurrentTime = require("../helpers/get-current-time");
const userFabric = require("../data/entities/user-fabric");
// Requires the database adapter-access layer that decides which database to use.
const { create } = require("../data/database-access");

async function createUser(name) {
  try {
    const id = uuidv4();
    const dateOfRegister = await getCurrentTime();
    console.log(`The date of register is: ${dateOfRegister}`);
    let user = await userFabric({ id, name, dateOfRegister });
    if (!(user instanceof Error)) {
      user = await create(user);
      return user;
    }
    return user.message;
  } catch (err) {
    return err.message;
  }
}

module.exports = { createUser };
