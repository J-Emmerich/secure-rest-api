// This is the entry point of the data-layer.
// It functions as a sort of adapter to the DB methods.
// It import the database from the connection-handler and exports a object with the methods.

const { dbToUse } = require("../config/config");

const database = require(`./${dbToUse}/connection`);
const methods = require(`./${dbToUse}/methods`);

database.methods = methods;

module.exports = database;
