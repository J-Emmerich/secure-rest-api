const methods = require("./controllers/player-controller");

// Methods to test in sandbox context:
const req = {
  params: {
    id: "ea727bd7-63a9-4c52-b51d-0b6ed8ae8614"
  },
  body: {
    name: "Sigma X"
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
methods.getAllPlayers(req, res);
// methods.getAllPlayersRanking(req, res);
// methods.playOneGame(req, res);
// methods.deletePlayerGames(req, res);
