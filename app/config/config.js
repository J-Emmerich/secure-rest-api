const mysqlConfig = {
  database: "devrest",
  username: "root",
  password: process.env.MYSQLPASS,
  host: "localhost"
};

const dbToUse = process.env.DB === "mongodb" ? "mongodb" : "sqlite";

module.exports = { mysqlConfig, dbToUse };
