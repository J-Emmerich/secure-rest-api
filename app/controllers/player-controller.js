/*
This file handle request and response objects.
// Controllers in Clean Architecture
*/

const {
  createPlayerInDB,
  getPlayersFromDB,
  getOnePlayerGamesInDB,
  updatePlayerNameInDB,
  makePlayerPlayOnceInDB,
  deletePlayerGamesFromDB,
  getTopRankingPlayerFromDB
} = require("./player-use-cases");

module.exports = (methods) => {
  async function registerNewPlayer(req, res) {
    try {
      const { name } = req.body;
      const player = await createPlayerInDB(methods, name);
      res.status(201).json(player);
    } catch (err) {
      console.log(err.message);
    }
  }

  async function getAllPlayers(req, res) {
    try {
      const players = await getPlayersFromDB(methods);
      res.status(200).json(players);
    } catch (err) {
      console.log(err.message);
    }
  }

  async function updateOnePlayerName(req, res) {
    try {
      const playerId = req.body.id;
      const playerName = req.body.name;
      const player = await updatePlayerNameInDB(methods, playerId, playerName);
      res.status(200).json(player);
    } catch (err) {
      console.log(err.message);
    }
  }

  async function getOnePlayerGames(req, res) {
    const playerId = req.params.id;
    const player = await getOnePlayerGamesInDB(methods, playerId);
    res.status(200).json(player);
  }

  async function playOneGame(req, res) {
    try {
      const playerId = req.params.id;
      const playerGame = await makePlayerPlayOnceInDB(methods, playerId);
      res.status(201).json(playerGame);
    } catch (err) {
      console.log(err.message);
    }
  }

  async function deletePlayerGames(req, res) {
    try {
      const playerId = req.params.id;
      const result = await deletePlayerGamesFromDB(methods, playerId);
      res.status(204).json(result);
    } catch (err) {
      console.log(err.message);
    }
  }

  async function getAllPlayersRanking(req, res) {
    try {
      const playerRankings = await getPlayersFromDB(methods, { short: true });
      res.status(200).json(playerRankings);
    } catch (err) {
      console.log(err.message);
    }
  }

  async function getPlayerHigherVictoryRate(req, res) {
    try {
      const topRanking = await getTopRankingPlayerFromDB(methods);
      res.status(200).json(topRanking);
    } catch (err) {
      console.log(err.message);
    }
  }
  async function getPlayerLowerVictoryRate(req, res) {
    try {
      const lowerRanking = await getTopRankingPlayerFromDB(methods, {
        reverse: true
      });
      res.status(200).json(lowerRanking);
    } catch (err) {
      console.log(err.message);
    }
  }

  return {
    registerNewPlayer,
    getAllPlayers,
    updateOnePlayerName,
    getOnePlayerGames,
    playOneGame,
    deletePlayerGames,
    getAllPlayersRanking,
    getPlayerLowerVictoryRate,
    getPlayerHigherVictoryRate
  };
};
