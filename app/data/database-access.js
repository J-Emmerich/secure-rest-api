// This is the entry point of the data-layer.
// It functions as a sort of adapter to the DB methods.
// It import the database from the connection-handler and exports a object with the methods.

const { dbToUse } = require("../config/config");

const database = {};
database.connection = require(`./${dbToUse}/connection`);
database.methods = require(`./${dbToUse}/methods`);

module.exports = database;
