/*

This are functions that deals with the entities and call DB methods 
They're the "use cases" in Clean Architecture

*/

const { v4: uuidv4 } = require("uuid");
const getCurrentTime = require("../helpers/get-current-time");
const playerFabric = require("../data/entities/player-fabric");
const { play } = require("../data/entities/game-fabric");

async function createPlayerInDB(methods, name) {
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

async function updatePlayerNameInDB(methods, id, name) {
  // Name validation function
  const player = await methods.updateName(id, name);
  return player;
}

async function getPlayersFromDB(methods, { short = false } = {}) {
  try {
    const players = await methods.getAllPlayers({ short });
    return players;
  } catch (err) {
    return err.message;
  }
}

async function getOnePlayerGamesInDB(methods, id) {
  try {
    const playerGames = await methods.getAllGamesFromOnePlayer(id);
    return playerGames;
  } catch (err) {
    return err.message;
  }
}
async function makePlayerPlayOnceInDB(methods, playerId) {
  try {
    let game = await play(playerId);
    game = await methods.saveGame(game); // DB handle it accordingly (mongo save in same document, mysql in two tables with foreign key)
    return game;
  } catch (err) {
    return err.message;
  }
}

async function deletePlayerGamesFromDB(methods, playerId) {
  try {
    const isDeleted = await methods.deleteGames(playerId);
    return isDeleted;
  } catch (err) {
    return err.message;
  }
}

async function getTopRankingPlayerFromDB(methods, { reverse = false } = {}) {
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
  getTopRankingPlayerFromDB
};