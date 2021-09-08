const { Player, Game } = require("./models");
const calcVictoryRate = require("../../helpers/calc-victory-rate");

async function create({ id, name, dateOfRegister }) {
  try {
    const newPlayer = await Player.create({
      id,
      name,
      dateOfRegister,
    });
    return newPlayer.toJSON();
  } catch (err) {
    return err;
  }
}

async function updateName(id, toUpdate) {
  let player = await Player.findByPk(id);
  player.name = toUpdate;
  player = await player.save();
  return player;
}

async function getAllPlayers({ short = false } = {}) {
  // return all players and their win rate
  try {
    if (short) {
      let players = await Player.findAll({
        include: [{ model: Game, attributes: ["result"] }],
        attributes: ["id", "name"],
      });
      players = players.map((player) => player.toJSON());
      // calculate victory rate and assign to player.
      players = players.map(async (player) => {
        const victoryRate = await calcVictoryRate(player.Games);
        const victory = {
          victoryRatePercentage: victoryRate,
        };
        Object.assign(player, victory);
        delete player.Games;
        return player;
      });
      // Promise.All resolves the array of promises that map returned
      players = Promise.all(players);
      return players;
    }
    let players = await Player.findAll({
      include: Game,
    });

    // Assign victory rate to the player
    players = players.map(async (player) => {
      const victoryRate = await calcVictoryRate(player.Games);
      const victory = {
        victoryRatePercentage: victoryRate,
      };
      Object.assign(player, victory);
      return player;
    });
    // resolves array of promises
    players = Promise.all(players);
    return players;
  } catch (err) {
    return err.message;
  }
}

async function saveGame({ id, diceOne, diceTwo, result, playerId }) {
  try {
    const newGame = await Game.create({
      id,
      diceOne,
      diceTwo,
      result,
      PlayerId: playerId,
    });

    let games = await Game.findAll({
      where: {
        PlayerId: playerId,
      },
    });
    games = games.map((game) => game.toJSON());
    const victoryRate = await calcVictoryRate(games);
    const player = await newGame.getPlayer();

    // Insert victory rate and player in the response object
    const gameToReturn = newGame.toJSON();
    gameToReturn.victoryRate = victoryRate;
    gameToReturn.player = player.toJSON().name;
    return gameToReturn;
  } catch (err) {
    return err.message;
  }
}

async function deleteGames(playerId) {
  const player = await Player.findOne({ where: { id: playerId } });
  const games = await player.getGames();
  games.map(async (game) => game.destroy({ truncate: true }));
  return player.toJSON();
}

async function getTopRanking({ reverse = false } = {}) {
  try {
    const players = await getAllPlayers({ short: true });
    const sortedPlayers = players.sort(
      (a, b) => a.victoryRatePercentage - b.victoryRatePercentage
    );
    const topPlayer = reverse
      ? sortedPlayers[0]
      : sortedPlayers[sortedPlayers.length - 1];

    return topPlayer;
  } catch (err) {
    return err.message;
  }
}

async function getAllGamesFromOnePlayer(playerId) {
  let player = await Player.findByPk(playerId, { include: Game });
  const victoryRate = await calcVictoryRate(player.Games);
  const victory = {
    victoryRatePercentage: victoryRate,
  };
  player = player.toJSON();
  const playerToReturn = { ...player, ...victory };
  return playerToReturn;
}

module.exports = {
  create,
  getAllPlayers,
  saveGame,
  deleteGames,
  updateName,
  getTopRanking,
  getAllGamesFromOnePlayer,
};
