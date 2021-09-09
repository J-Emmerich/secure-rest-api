const { connect } = require("mongoose");
const mysql2 = require("mysql2/promise");
const Sequelize = require("sequelize");
const { credentials } = require("../../config/config");

const {
  username: user,
  port: portdb,
  database,
  host,
  password,
  initMysql,
} = credentials;

const mysql = new Sequelize(database, user, password, {
  host,
  dialect: "mysql",
  define: {
    freezeTableName: true,
  },
});

module.exports = mysql;
