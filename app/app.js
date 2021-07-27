require("dotenv").config();
const express = require("express");
const { connection } = require("./data/database-access");
const router = require("./routes/players");

const app = express();
const { PORT } = process.env;

// Start the database
connection();

app.use("/players", router);

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
