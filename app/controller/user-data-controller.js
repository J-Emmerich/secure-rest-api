const { v4: uuidv4 } = require("uuid");
const getCurrentTime = require("../helpers/get-current-time");
const userFabric = require("../data/user-fabric");

async function createUser({ database } = {}) {
  try {
    const id = uuidv4();
    const dateOfRegister = await getCurrentTime();
    const user = await userFabric({ id, dateOfRegister });
    database.insert(user);
  } catch (err) {
    console.log("We Found an error! : ", err.message);
  }
}

createUser();
