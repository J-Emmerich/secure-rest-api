/*
This is the client API that calls the (Adapter)- DataLayer
This are functions that deals with the entities. 
It's one level deeper than the player controller

It has no idea with DB is being used.
*/

const { v4: uuidv4 } = require("uuid");
const getCurrentTime = require("../helpers/get-current-time");
const playerFabric = require("../data/entities/player-fabric");
const { play } = require("../data/entities/game-fabric");

// Requires the database adapter-access layer that decides which database to use.
const { methods } = require("../data/database-access");

async function createPlayerInDB(name) {
  try {
    const id = uuidv4();
    const dateOfRegister = await getCurrentTime();
    let player = await playerFabric({ id, name, dateOfRegister });
    if (!(player instanceof Error)) {
      player = await methods.create(player);
      return player;
    }
    return player.message;
  } catch (err) {
    return err.message;
  }
}

async function updatePlayerNameInDB(id, name) {
  const player = await methods.updateName(id, name);
  console.log("This is the update", player);
  return player;
}

async function getPlayersFromDB() {
  try {
    const players = await methods.getAllPlayers();
    return players;
  } catch (err) {
    return err.message;
  }
}

async function getOnePlayerInDB(id) {
  try {
    const player = await methods.findOne(id);
    return player;
  } catch (err) {
    return err.message;
  }
}
async function makePlayerPlayOnce(playerId) {
  try {
    let game = await play(playerId);
    console.log(game);
    game = await methods.saveGame(game);
    return game;
  } catch (err) {
    return err.message;
  }
}
module.exports = {
  createPlayerInDB,
  getPlayersFromDB,
  updatePlayerNameInDB,
  getOnePlayerInDB,
  makePlayerPlayOnce,
};
