process.stdin.resume();
const mongoose = require("mongoose");
const { credentials } = require("../../config/config");

let uri;
if (credentials.username === "") {
  uri = `mongodb://localhost:${credentials.port}/${credentials.database}`;
} else {
  uri = `mongodb://${credentials.username}:${credentials.password}@${credentials.host}:${credentials.port}/${credentials.database}`;
}

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
