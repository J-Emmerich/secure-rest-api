// This is the entry point of the data-layer.
// It import the database from
// the connection-handler and exports a object with the methods.

const { DB } = process.env;
const database = require(`./${DB}/connection`);
const methods = require(`./${DB}/methods`);

database.methods = methods;

module.exports = database;
