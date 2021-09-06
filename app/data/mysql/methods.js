const { Player, Game } = require("./models/index");

async function create(player) {
  try {
    const newPlayer = await Player.create(player);
    return newPlayer.toJSON();
  } catch (err) {
    return err;
  }
}

async function getAllPlayers() {
  // return all players and their win rate
}

module.exports = { create, getAllPlayers };
