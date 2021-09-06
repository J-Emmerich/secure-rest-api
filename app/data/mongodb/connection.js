process.stdin.resume();
const mongoose = require("mongoose");

const user = process.env.USER;
const password = process.env.PASSWORD;

const uri = `mongodb+srv://${user}:${password}@base.b4wyc.mongodb.net/Base?retryWrites=true&w=majority`;
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

mongoose.connect(uri, options);
mongoose.connection.on("connected", () => {
  console.log("Connected to Mongoose");
});
mongoose.connection.on("disconnected", () => {
  console.log("Disconnected from Mongoose");
});

// Disconnect from mongoose when server is killed

process.on("SIGINT", async () => {
  await mongoose.disconnect();

  process.exit();
});

module.exports = mongoose;
