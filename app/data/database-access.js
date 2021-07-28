// This is the entry point of the data-layer.
// It import the database from
// the connection-handler and exports a object with the methods.

const { DB } = process.env;
let database = require("./connection-handler")[DB];
const methods = require("./mongo/mongo-methods");
database.methods = methods;
database.start = function () {
  database.connection();
  return database;
};

module.exports = database;
