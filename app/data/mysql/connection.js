const Sequelize = require("sequelize");
const { mysqlConfig } = require("../../config/config");

const { username, database, host, password } = mysqlConfig;

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
