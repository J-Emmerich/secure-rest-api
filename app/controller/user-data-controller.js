/*
This is the client API that calls the (Adapter)- DataLayer
This are functions that deals with the entities. 
It's paired with user-controller. Both are on the same architectural level.
*/

const { v4: uuidv4 } = require("uuid");
const getCurrentTime = require("../helpers/get-current-time");
const userFabric = require("../data/user-fabric");

async function createUser(database) {
  try {
    const id = uuidv4();
    const dateOfRegister = await getCurrentTime();
    let user = await userFabric({ id, dateOfRegister });
    user = await database.create(user);
    return user;
  } catch (err) {
    console.log("We Found an error! : ", err.message);
  }
}

module.exports = createUser;
