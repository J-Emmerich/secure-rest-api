const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  id: String,
  name: String,
  dateOfRegister: String,
  games: [
    {
      id: String,
      diceOne: Number,
      diceTwo: Number,
      result: Boolean
    }
  ]
});

const User = mongoose.model("User", userSchema);

module.exports = User;
