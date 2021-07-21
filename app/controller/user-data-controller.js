/*
This is the client API that calls the (Adapter)- DataLayer
*/

const { v4: uuidv4 } = require("uuid");
const getCurrentTime = require("../helpers/get-current-time");
const userFabric = require("../data/user-fabric");
const database = "..data/database-adapter";

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
