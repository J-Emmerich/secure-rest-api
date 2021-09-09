const mysql2 = require("mysql2/promise");
const Sequelize = require("sequelize");
const { credentials } = require("../../config/config");

const { username: user, database, host, password } = credentials;

const mysql = new Sequelize(database, user, password, {
  host,
  dialect: "mysql",
  define: {
    freezeTableName: true,
  },
});

process.on("SIGINT", async () => {
  await mysql.close();
  console.log("Disconnected from mysql");
  process.exit();
});

module.exports = mysql;
