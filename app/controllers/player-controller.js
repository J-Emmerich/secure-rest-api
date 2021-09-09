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

// Export as a function. Receives the DB methods following DI rules
module.exports = (methods) => {
  async function registerNewPlayer(req, res) {
    try {
      const { name } = req.body;
      const player = await createPlayerInDB(methods, name);
      if (player instanceof Error) throw player;
      res.status(201).json(player);
    } catch (err) {
      res.status(403).json(err);
    }
  }

  async function getAllPlayers(req, res) {
    try {
      const players = await getPlayersFromDB(methods);
      res.status(200).json(players);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  async function updateOnePlayerName(req, res) {
    try {
      const playerId = req.body.id;
      const playerName = req.body.name;
      const player = await updatePlayerNameInDB(methods, playerId, playerName);
      if (player instanceof Error) throw player;
      res.status(200).json(player);
    } catch (err) {
      res.status(403).json(err);
    }
  }

  async function getOnePlayerGames(req, res) {
    try {
      const playerId = req.params.id;
      const player = await getOnePlayerGamesInDB(methods, playerId);
      if (player instanceof Error) throw Error("No such player");
      res.status(200).json(player);
    } catch (err) {
      res.status(403).json(err);
    }
  }

  async function playOneGame(req, res) {
    try {
      const playerId = req.params.id;
      const playerGame = await makePlayerPlayOnceInDB(methods, playerId);
      if (playerGame instanceof Error) throw Error("No such player");
      res.status(201).json(playerGame);
    } catch (err) {
      res.status(403).json(err);
    }
  }

  async function deletePlayerGames(req, res) {
    try {
      const playerId = req.params.id;
      const result = await deletePlayerGamesFromDB(methods, playerId);
      if (result instanceof Error) throw Error("No such player");
      res.status(204).json(result);
    } catch (err) {
      res.status(403).json(err);
    }
  }

  async function getAllPlayersRanking(req, res) {
    try {
      const playerRankings = await getPlayersFromDB(methods, { short: true });
      res.status(200).json(playerRankings);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  async function getPlayerHigherVictoryRate(req, res) {
    try {
      const topRanking = await getTopRankingPlayerFromDB(methods);
      res.status(200).json(topRanking);
    } catch (err) {
      res.status(500).json(err);
    }
  }
  async function getPlayerLowerVictoryRate(req, res) {
    try {
      const lowerRanking = await getTopRankingPlayerFromDB(methods, {
        reverse: true
      });
      res.status(200).json(lowerRanking);
    } catch (err) {
      res.status(500).json(err);
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
