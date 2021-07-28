// This file exports the connections methods from mongo and mysql

const mysql = require("./mysql/connection");
const mongodb = require("./mongo/connection");

module.exports = { mysql, mongodb };
