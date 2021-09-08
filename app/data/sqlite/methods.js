const { Player, Game } = require("../mysql/models");
const calcVictoryRate = require("../../helpers/calc-victory-rate");

async function create({ id, name, dateOfRegister }) {
  try {
    const newPlayer = await Player.create({
      id,
      name,
      dateOfRegister,
    });
    console.log("***** register");

    return newPlayer.toJSON();
  } catch (err) {
    return err;
  }
}

async function getAllPlayers({ short = false } = {}) {
  // return all players and their win rate
  try {
    if (!short) {
      let players = await Player.findAll({
        include: [{ model: Game }],
      });
      players = players.map((player) => player.toJSON());
      return players;
    }
    let players = await Player.findAll({
      attributes: ["name", "id"],
    });

    // Map each instance of the model to json to remove clutter in response
    players = players.map((player) => player.toJSON());

    console.log("***** getAllPlayersRanking");
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

module.exports = { create, getAllPlayers, saveGame, deleteGames };
