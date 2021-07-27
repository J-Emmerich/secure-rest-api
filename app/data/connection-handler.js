// This file exports the connections methods from mongo and mysql

const mysql = require("./mysql/mockedSequelize");
const mongodb = require("./mongo/connection");

mysql.name = "mysql";
mongodb.name = "mongodb";

module.exports = { mysql, mongodb };
