// Adapts method
// Receives a connection and call the database methods.
const database = require("./connection");

function create({ id, name, dateOfRegistry }) {
  database.create(user.id, user.name, user.dateOfRegistry);
  return user;
}

module.exports = create;
