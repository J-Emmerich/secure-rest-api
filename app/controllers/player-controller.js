/*
This is the file that decides what to do with the request.
It has no idea which database is being used. 
*/

const {
  createPlayerInDB,
  getPlayersFromDB,
  getOnePlayerInDB,
  updatePlayerNameInDB,
  makePlayerPlayOnce,
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

async function updatePlayerName(req, res) {
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

async function getOnePlayer(req, res) {
  const playerId = req.params.id;
  const player = await getOnePlayerInDB(playerId);
  res.status(200).json(player);
}

async function playOneGame(req, res) {
  try {
    const playerId = req.params.id;
    const playerGame = await makePlayerPlayOnce(playerId);
    res.status(201).json(playerGame);
  } catch (err) {
    console.log(err.message);
  }
}

module.exports = {
  registerNewPlayer,
  getAllPlayers,
  updatePlayerName,
  getOnePlayer,
  playOneGame,
};
