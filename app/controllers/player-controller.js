/*
This file handle request and response objects.
*/

const {
  createPlayerInDB,
  getPlayersFromDB,
  getOnePlayerGamesInDB,
  updatePlayerNameInDB,
  makePlayerPlayOnceInDB,
  deletePlayerGamesFromDB,
  getTopRankingPlayerFromDB,
} = require("./player-data-controller");

async function registerNewPlayer(req, res) {
  try {
    const { name } = req.body;
    const player = await createPlayerInDB(name);
    console.log("this the player created:::", player);
    res.status(201).json(player);
  } catch (err) {
    console.log(err.message);
  }
}

async function getAllPlayers(req, res) {
  try {
    const players = await getPlayersFromDB();
    res.status(200).json(players);
  } catch (err) {
    console.log(err.message);
  }
}

async function updateOnePlayerName(req, res) {
  try {
    const playerId = req.body.id;
    const playerName = req.body.name;
    console.log(playerId);
    console.log(playerName);
    const player = await updatePlayerNameInDB(playerId, playerName);
    res.status(200).json(player);
  } catch (err) {
    console.log(err.message);
  }
}

async function getOnePlayerGames(req, res) {
  const playerId = req.params.id;
  const player = await getOnePlayerGamesInDB(playerId);
  res.status(200).json(player);
}

async function playOneGame(req, res) {
  try {
    const playerId = req.params.id;
    const playerGame = await makePlayerPlayOnceInDB(playerId);
    res.status(201).json(playerGame);
  } catch (err) {
    console.log(err.message);
  }
}

async function deletePlayerGames(req, res) {
  try {
    const playerId = req.params.id;
    const result = await deletePlayerGamesFromDB(playerId);
    res.status(200).json(result);
  } catch (err) {
    console.log(err.message);
  }
}

async function getAllPlayersRanking(req, res) {
  try {
    const playerRankings = await getPlayersFromDB({ short: true });
    res.status(200).json(playerRankings);
  } catch (err) {
    console.log(err.message);
  }
}

async function getPlayerHigherVictoryRate(req, res) {
  try {
    const topRanking = await getTopRankingPlayerFromDB();
    res.status(200).json(topRanking);
  } catch (err) {
    console.log(err.message);
  }
}
async function getPlayerLowerVictoryRate(req, res) {
  try {
    const lowerRanking = await getTopRankingPlayerFromDB({ reverse: true });
    res.status(200).json(lowerRanking);
  } catch (err) {
    console.log(err.message);
  }
}
module.exports = {
  registerNewPlayer,
  getAllPlayers,
  updateOnePlayerName,
  getOnePlayerGames,
  playOneGame,
  deletePlayerGames,
  getAllPlayersRanking,
  getPlayerLowerVictoryRate,
  getPlayerHigherVictoryRate,
};