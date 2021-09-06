const Player = require("./models/player");

async function create(player) {
  const newPlayer = new Player(player);
  await newPlayer.save((err) => {
    if (err) console.log(`There was an error ${err}`);
  });
  return newPlayer;
}

async function getAllPlayers() {
  try {
    const players = await Player.find({});
    return players;
  } catch (err) {
    return err.message;
  }
}

async function updateName(id, toUpdate) {
  const updated = await Player.findOneAndUpdate({ id: id }, { name: toUpdate });
  return updated;
}

async function findOne(id) {
  try {
    const player = await Player.find({ id });
    return player;
  } catch (err) {
    return err.message;
  }
}

async function saveGame(game) {
  try {
    const player = await Player.findOneAndUpdate(
      { id: game.playerId },
      { $push: { games: game } },
      { useFindAndModify: false, new: true }
    );
    console.log("this is what returns from update", player);
    return player;
  } catch (err) {
    return err.message;
  }
}
module.exports = { create, getAllPlayers, updateName, findOne, saveGame };
