require("dotenv").config();

const express = require("express");
const router = require("./routes/players");
const authRouter = require("./routes/login");
const { getToken } = require("./middlewares/authentication");

// Requires the database methods, is the database-access layer that decides which database to use.
const { methods } = require("./data/database-access");
const { PORT } = require("./config/config");

const app = express();

app.use(express.json());
app.use("/login", authRouter);
app.use(getToken);
app.use("/players", router(methods)); // <---- Dependency injection of DB. Clean Architecture.
app.listen(PORT, async () => {
  console.log(`Server is listening on port ${PORT}`);
});
