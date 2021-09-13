// Define your DB credentials here

const credentials = {
  username: "root",
  password: "1234",
  host: "localhost",
  database: "onethatdoesnotexist",
  dbPort: "23007", // <-- Only if you're using mongodb
};

const dbToUse = process.env.DB === "mysql" ? "mysql" : "mongodb";

// Server config
const PORT = 3001;

module.exports = { credentials, dbToUse, PORT };
