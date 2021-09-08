const mysqlConfig = {
  database: "devrest",
  username: "root",
  password: process.env.MYSQLPASS,
  host: "localhost",
};

const dbToUse = process.env.DB === "mongodb" ? "mongodb" : "mysql";

module.exports = { mysqlConfig, dbToUse };
