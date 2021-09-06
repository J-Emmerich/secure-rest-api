/* eslint-disable no-underscore-dangle */
const mongoose = require("mongoose");

const playerSchema = new mongoose.Schema(
  {
    id: String,
    name: String,
    dateOfRegister: String,
    games: [
      {
        id: String,
        diceOne: Number,
        diceTwo: Number,
        result: Boolean,
      },
    ],
  },
  {
    toJSON: {
      transform: (document, returnedObj) => {
        delete returnedObj._id;
      },
    },
  }
);

const Player = mongoose.model("Player", playerSchema);

module.exports = Player;
