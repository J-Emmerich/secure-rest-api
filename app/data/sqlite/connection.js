const { Sequelize } = require("sequelize");

const sqlite = new Sequelize({
  dialect: "sqlite",
  storage: "./app/data/sqlite/database.sqlite",
});

module.exports = sqlite;
