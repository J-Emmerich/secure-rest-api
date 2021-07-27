const Sequelize = require("sequelize");
const { username, database, host, password } = require("../config/config");

// Create the connection instance, freezing auto table-naming.
const connection = new Sequelize(database, username, password, {
  host,
  dialect: "mysql",
  define: {
    freezeTableName: true
  }
});

module.exports = connection;
