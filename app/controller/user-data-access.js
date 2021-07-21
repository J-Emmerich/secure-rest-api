/*
This is the client API that calls the (Adapter)- DataLayer
*/

const adapter = "..data/database-adapter";
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
    return `We Found an error! :  ${err.message}`;
  }
}

module.exports = createUser;
