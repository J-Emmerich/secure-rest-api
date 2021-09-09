const methods = require("./controllers/player-controller");

// Methods to test in sandbox context:
const req = {
  params: {
    id: "aef3cbb2-7a5d-497c-bf54-221095934ed0"
  },
  body: {
    name: "Ginger Delta"
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

// methods.registerNewPlayer(req, res);
// methods.playOneGame(req, res);
// methods.deletePlayerGames(req, res);

// To Test

methods.getAllPlayersRanking(req, res);
// methods.getAllPlayers(req, res);
// methods.getOnePlayerGames(req, res);
