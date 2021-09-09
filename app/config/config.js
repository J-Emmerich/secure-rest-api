// Define your DB credentials here

const credentials = {
  username: "root",
  password: "1234",
  host: "localhost",
  database: "onethatdoesnotexist",
  port: "27007", // <-- Only if you're using mongodb
};

const dbToUse = process.env.NODE_ENV === "mysql" ? "mysql" : "mongodb";

module.exports = { credentials, dbToUse };
