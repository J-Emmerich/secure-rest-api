process.stdin.resume();
const mongoose = require("mongoose");
const user = process.env.USER;
const password = process.env.PASSWORD;
const uri =
  `mongodb+srv://${user}:${password}@base.b4wyc.mongodb.net/Base?retryWrites=true&w=majority`;
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true
};

const mongoDB = {
  name: "mongodb",
  connection: async function () {
    mongoose.connect(uri, options);
    mongoose.connection.on("connected", () => {
      console.log("Connected to Mongoose");
    });
    mongoose.connection.on("disconnected", () => {
      console.log("Disconnected from Mongoose");
    });
    process.on("SIGINT", () => {
      mongoose.connection.close(
        console.log("The connection with MongoDB was closed.")
      );
    });
  }
};

module.exports = mongoDB;
