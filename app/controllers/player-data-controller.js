/*

This are functions that deals with the entities and call DB methods 
It's one level deeper than the player controller
It has no idea which DB is being used.

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

async function getPlayersFromDB({ short = false } = {}) {
  try {
    const players = await methods.getAllPlayers({ short });
    return players;
  } catch (err) {
    return err.message;
  }
}

async function getOnePlayerGamesInDB(id) {
  try {
    const playerGames = await methods.getAllGamesFromOnePlayer(id);
    return playerGames;
  } catch (err) {
    return err.message;
  }
}
async function makePlayerPlayOnceInDB(playerId) {
  try {
    let game = await play(playerId); // Game object is sent with the player Id.
    game = await methods.saveGame(game); // DB handle it accordingly (mongo save in same document, mysql in two tables with foreign key)
    return game;
  } catch (err) {
    return err.message;
  }
}

async function deletePlayerGamesFromDB(playerId) {
  try {
    const isDeleted = await methods.deleteGames(playerId);
    return isDeleted;
  } catch (err) {
    return err.message;
  }
}

async function getTopRankingPlayerFromDB({ reverse = false } = {}) {
  try {
    const topRanking = await methods.getTopRanking({ reverse });
    return topRanking;
  } catch (err) {
    return err.message;
  }
}

module.exports = {
  createPlayerInDB,
  getPlayersFromDB,
  updatePlayerNameInDB,
  getOnePlayerGamesInDB,
  makePlayerPlayOnceInDB,
  deletePlayerGamesFromDB,
  getTopRankingPlayerFromDB,
};
