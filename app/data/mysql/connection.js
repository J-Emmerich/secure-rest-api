const Sequelize = require("sequelize");
const { username, database, host, password } = require("../../config/config");

// Create the connection instance, freezing auto table-naming.

const mysql = new Sequelize(database, username, password, {
  host,
  dialect: "mysql",
  define: {
    freezeTableName: true,
  },
});

mysql.authenticate();

module.exports = mysql;
