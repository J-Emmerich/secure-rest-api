const Sequelize = require("sequelize");
const { username, database, host, password } = require("../config/config");

const sequelize = new Sequelize(database, username, password, {
  host,
  dialect: "mysql",
});

module.exports = sequelize;
