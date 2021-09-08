const Player = require("./models/player");
const calcVictoryRate = require("../../helpers/calc-victory-rate");

// Must return 1 Player
async function create(player) {
  const newPlayer = new Player(player);
  await newPlayer.save((err) => {
    if (err) console.log(`There was an error ${err}`);
  });
  return newPlayer;
}
// Must return all players and their victory rate
async function getAllPlayers({ short = false } = {}) {
  try {
    if (short) {
      const players = await Player.find({}, "id name victoryRatePercentage");
      console.log(players);
      return players;
    }
    const players = await Player.find({});
    return players;
  } catch (err) {
    return err.message;
  }
}

// Must return the UPDATED version of the player
async function updateName(id, toUpdate) {
  const updated = await Player.findOneAndUpdate(
    { id: id },
    { name: toUpdate },
    { useFindAndModify: false, new: true }
  );
  return updated;
}

// Return 1 player
async function findOne(id) {
  try {
    const player = await Player.find({ id });
    return player;
  } catch (err) {
    return err.message;
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
    const victoryRate = await calcVictoryRate(player.games);

    player.victoryRatePercentage = victoryRate;
    player = await player.save();
    return player;
  } catch (err) {
    return err.message;
  }
}

async function deleteGames(playerId) {
  const player = await Player.findOne({ id: playerId });
  player.victoryRatePercentage = 0;
  player.games = [];
  await player.save();
  return player;
}

async function getAllGamesFromOnePlayer(playerId) {
  try {
    let playerGames = await Player.findOne({ id: playerId });
    playerGames = playerGames.games;
    return playerGames;
  } catch (err) {
    return err.message;
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
    return err.message;
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
