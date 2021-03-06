const { Player, Game } = require("./models");
const calcVictoryRate = require("../../helpers/calc-victory-rate");
const assignVictoryRateToPlayer = require("../../helpers/assign-victory-rate");

async function isUniqueName(name) {
  // Returns boolean
  const player = await Player.findOne({ where: { name: name } });
  return player === null;
}

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
  try {
    let player = await Player.findByPk(id);
    player.name = toUpdate;
    player = await player.save();
    return player;
  } catch (err) {
    return err;
  }
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
        player = await assignVictoryRateToPlayer(player);
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
    players = players.map((player) => player.toJSON());
    players = players.map(async (player) => {
      player = await assignVictoryRateToPlayer(player);
      return player;
    });
    // resolves array of promises
    players = Promise.all(players);
    return players;
  } catch (err) {
    return err;
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
    if (games === null) throw Error("No such player");
    const player = await Player.findByPk(playerId);
    games = games.map((game) => game.toJSON());

    const victoryRate = await calcVictoryRate(games);

    // Insert victory rate and player in the response object
    const gameToReturn = newGame.toJSON();
    gameToReturn.victoryRate = victoryRate;
    gameToReturn.player = player.toJSON().name;
    return gameToReturn;
  } catch (err) {
    return err;
  }
}

async function deleteGames(playerId) {
  try {
    const player = await Player.findOne({ where: { id: playerId } });
    if (player === null) throw Error("No such player");
    if (player === null) throw Error("No such player");
    const games = await player.getGames();
    games.map(async (game) => game.destroy({ truncate: true }));
    return player.toJSON();
  } catch (err) {
    return err;
  }
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
    return err;
  }
}

async function getAllGamesFromOnePlayer(playerId) {
  try {
    let player = await Player.findByPk(playerId, { include: Game });
    if (player === null) throw Error("No such player");
    const victoryRate = await calcVictoryRate(player.Games);
    const victory = {
      victoryRatePercentage: victoryRate,
    };
    player = player.toJSON();
    const playerToReturn = { ...player, ...victory };
    return playerToReturn;
  } catch (err) {
    return err;
  }
}

module.exports = {
  create,
  getAllPlayers,
  saveGame,
  deleteGames,
  updateName,
  getTopRanking,
  getAllGamesFromOnePlayer,
  isUniqueName,
};
