const { MongoClient } = require("mongodb");
// Connection URI
const uri =
  "mongodb+srv://admin:1234@base.b4wyc.mongodb.net/Base?retryWrites=true&w=majority";
// Create a new MongoClient
const connection = new MongoClient(uri);

module.exports = connection;
