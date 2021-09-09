const Player = require("./models/player");
const calcVictoryRate = require("../../helpers/calc-victory-rate");

// Must return 1 Player
async function create(player) {
  try {
    const newPlayer = new Player(player);
    await newPlayer.save();
    return newPlayer;
  } catch (err) {
    return err;
  }
}
// Must return all players and their victory rate
async function getAllPlayers({ short = false } = {}) {
  try {
    if (short) {
      const players = await Player.find({}, "id name victoryRatePercentage");
      return players;
    }
    const players = await Player.find({});
    return players;
  } catch (err) {
    return err;
  }
}

// Must return the UPDATED version of the player
async function updateName(id, toUpdate) {
  try {
    const updated = await Player.findOneAndUpdate(
      { id: id },
      { name: toUpdate },
      { useFindAndModify: false, new: true }
    );
    return updated;
  } catch (err) {
    return err;
  }
}

// Return 1 player
async function findOne(id) {
  try {
    const player = await Player.find({ id });
    return player;
  } catch (err) {
    return err;
  }
}

// Must save the game, save the victory rate and return player
async function saveGame(gameToSave) {
  try {
    let player = await Player.findOneAndUpdate(
      { id: gameToSave.playerId },
      { $push: { games: gameToSave } },
      { useFindAndModify: false, new: true }
    );
    if (player === null) throw Error("No such player");

    const victoryRate = await calcVictoryRate(player.games);

    player.victoryRatePercentage = victoryRate;
    player = await player.save();
    return player;
  } catch (err) {
    return err;
  }
}

async function deleteGames(playerId) {
  try {
    const player = await Player.findOne({ id: playerId });
    if (player === null) throw Error("No such player");
    player.victoryRatePercentage = 0;
    player.games = [];
    await player.save();
    return true;
  } catch (err) {
    return err;
  }
}
async function getAllGamesFromOnePlayer(playerId) {
  try {
    let playerGames = await Player.findOne({ id: playerId });
    if (playerGames === null) throw Error("No such player");
    playerGames = playerGames.games;
    return playerGames;
  } catch (err) {
    return err;
  }
}

async function getTopRanking({ reverse = false } = {}) {
  try {
    const order = reverse ? 1 : -1;
    const player = await Player.find({})
      .sort({
        victoryRatePercentage: order
      })
      .limit(1);
    return player;
  } catch (err) {
    return err;
  }
}

module.exports = {
  create,
  getAllPlayers,
  updateName,
  findOne,
  saveGame,
  deleteGames,
  getAllGamesFromOnePlayer,
  getTopRanking
};
