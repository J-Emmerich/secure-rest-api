// This is the entry point of the data-layer.
// It import the database from
// the connection-handler and modifies the
// methods depending on a .env config.
// It Exports the adapted databaseMethods and the connection.

const { DB } = process.env;

//Who start the connection with the database? -App.js or Server.js?
// const { connection } = require("./connection-handler")[DB];
const { connection } = require("./connection-handler")[DB];
const database = require("./connection-handler")[DB];
const adapter = require("./database-adapter");

async function create(user) {
  adapter.create(database, user);
  return user;
}

module.exports = { connection, create };
