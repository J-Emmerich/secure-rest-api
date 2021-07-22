// Adapts method
// Receives a connection and call the database methods.
const database = require("./connection");

function create(user) {
  database.create(user.id, user.name, user.dateOfRegistry);
  return user;
}

module.exports = create;
