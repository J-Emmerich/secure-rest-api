const controler = require("./controllers/player-controller");

const { methods } = require("./data/database-access");

const playerControler = controler(methods);
// Methods to test in sandbox context:
const req = {
  params: {
    id: "563dfac7-7176-4b46-acfe-91ec39cxcx2334c4"
  },
  body: {
    name: "e Sigma"
  }
};

function status(param) {
  console.log(param);
  return this;
}

const res = {
  json: (param) => console.log(param)
};

res.status = status;

// playerControler.registerNewPlayer(req, res);
// playerControler.playOneGame(req, res);
// playerControler.deletePlayerGames(req, res);

// To Test

// playerControler.getAllPlayersRanking(req, res);
// playerControler.getAllPlayers(req, res);
playerControler.getOnePlayerGames(req, res);
