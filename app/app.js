require("dotenv").config();

const express = require("express");
const router = require("./routes/players");
// Requires the database methods, is the database-access layer that decides which database to use.
const { methods } = require("./data/database-access");

const app = express();
const { PORT } = process.env;

app.use(express.json());
app.use("/players", router(methods)); // <---- Dependency injection of DB. Clean Architecture.

app.listen(PORT, async () => {
  console.log(`Server is listening on port ${PORT}`);
});
