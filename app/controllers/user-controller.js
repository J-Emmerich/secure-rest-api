/*
This is the file that decides if the database method must be called
It has no idea which database is being used. 
*/

const { createUser } = require("./user-data-controller");

async function register(req, res) {
  const name = req.name;
  const user = await createUser(name);
  res.json(user);
}

module.exports = { register };
