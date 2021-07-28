const mysql = {
  database: "devrest",
  username: "root",
  password: process.env.MYSQLPASS,
  host: "localhost",
};

module.exports = mysql;
