require("dotenv").config();

const database = require("./data/database-access");
const express = require("express");
const router = require("./routes/players");
const { createUser } = require("./controllers/user-data-controller");

const app = express();
const { PORT } = process.env;

async function start() {
  await database.start();
  await createUser("Lolipop");
}

start();

app.use(express.json());
app.use("/players", router);

app.listen(PORT, async () => {
  console.log(`Server is listening on port ${PORT}`);
});
