require("dotenv").config();

const express = require("express");
const router = require("./routes/players");
const { connection } = require("./data/database-access");

const app = express();
const { PORT } = process.env;
// Calls the db connection
connection();

app.use(express.json());
app.use("/players", router);

app.listen(PORT, async () => {
  console.log(`Server is listening on port ${PORT}`);
});
