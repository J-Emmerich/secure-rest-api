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
    const isUniquePlayer = await methods.isUniqueName(name);
    if (isUniquePlayer) {
      const id = uuidv4();
      const dateOfRegister = await getCurrentTime();
      let player = await playerFabric({ id, name, dateOfRegister });
      if (player instanceof Error) throw player;
      player = await methods.create(player);
      return player; // <--- This is an error instance throw by playerFabric
    }
    throw Error("Name is not unique");
  } catch (err) {
    return err;
  }
}

async function updatePlayerNameInDB(methods, id, name) {
  try {
    const isPlayerInDb = await methods.findById(id);
    const isUniquePlayer = await methods.isUniqueName(name);
    if (isUniquePlayer && isPlayerInDb) {
      const player = await methods.updateName(id, name);
      return player;
    }
    throw Error("Name to update is not unique or not in database");
  } catch (err) {
    return err;
  }
}

async function getPlayersFromDB(methods, { short = false } = {}) {
  try {
    const players = await methods.getAllPlayers({ short });
    return players;
  } catch (err) {
    return err;
  }
}

async function getOnePlayerGamesInDB(methods, id) {
  try {
    const playerGames = await methods.getAllGamesFromOnePlayer(id);
    if (playerGames instanceof Error) throw Error("No such player");
    return playerGames;
  } catch (err) {
    return err;
  }
}
async function makePlayerPlayOnceInDB(methods, playerId) {
  try {
    let game = await play(playerId);
    game = await methods.saveGame(game);
    if (game instanceof Error) throw Error("No such player");
    return game;
  } catch (err) {
    return err;
  }
}

async function deletePlayerGamesFromDB(methods, playerId) {
  try {
    const isDeleted = await methods.deleteGames(playerId);
    return isDeleted;
  } catch (err) {
    return err;
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
  getTopRankingPlayerFromDB,
};
