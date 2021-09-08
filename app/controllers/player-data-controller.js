/*

This are functions that deals with the entities and call DB methods 
They're the "use cases" in Clean Architecture

*/

const { v4: uuidv4 } = require("uuid");
const getCurrentTime = require("../helpers/get-current-time");
const playerFabric = require("../data/entities/player-fabric");
const { play } = require("../data/entities/game-fabric");

// Requires the database methods, is the database-access layer that decides which database to use.
const { methods } = require("../data/database-access");

async function createPlayerInDB(name) {
  try {
    // Find player with same name with a function find

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
  // Name validation function
  const player = await methods.updateName(id, name);
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
    let game = await play(playerId);
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
