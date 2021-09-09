const controler = require("./controllers/player-controller");

const { methods } = require("./data/database-access");

const playerControler = controler(methods);
// Methods to test in sandbox context:
const req = {
  params: {
    id: "aef3cbb2-7a5d-497c-bf54-221095934ed0"
  },
  body: {
    name: "Candy Sigma"
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
// playerControler.getOnePlayerGames(req, res);
