require("dotenv").config();

const express = require("express");
const router = require("./routes/players");

const app = express();
const { PORT } = process.env;

app.use(express.json());
app.use("/players", router);

app.listen(PORT, async () => {
  console.log(`Server is listening on port ${PORT}`);
});
