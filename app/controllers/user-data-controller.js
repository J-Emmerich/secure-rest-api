/*
This is the client API that calls the (Adapter)- DataLayer
This are functions that deals with the entities. 
It's paired with user-controller. Both are on the same architectural level.
*/

const { v4: uuidv4 } = require("uuid");
const getCurrentTime = require("../helpers/get-current-time");
const userFabric = require("../data/entities/user-fabric");
// Requires the database adapter-access layer that decides which database to use.
const { methods } = require("../data/database-access");
// const methods = require("../data/mongo/mongo-methods");

async function createUser(name) {
  try {
    const id = uuidv4();
    const dateOfRegister = await getCurrentTime();
    let user = await userFabric({ id, name, dateOfRegister });
    if (!(user instanceof Error)) {
      user = await methods.create(user);
      return user;
    }
    return user.message;
  } catch (err) {
    return err.message;
  }
}

module.exports = { createUser };
