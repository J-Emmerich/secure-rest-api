const express = require("express");
const controler = require("../controllers/player-controller");

// Router is exported as a function to accept Database Methods in parameter
const playerRouter = (databaseMethods) => {
  const router = express.Router();

  const playerControler = controler(databaseMethods);

  router.get("/", playerControler.getAllPlayers);
  router.put("/", playerControler.updateOnePlayerName);
  router.post("/", playerControler.registerNewPlayer);

  router.get("/:id/games", playerControler.getOnePlayerGames);
  router.post("/:id/games", playerControler.playOneGame);
  router.delete("/:id/games", playerControler.deletePlayerGames);

  router.get("/ranking", playerControler.getAllPlayersRanking);
  router.get("/ranking/winner", playerControler.getPlayerHigherVictoryRate);
  router.get("/ranking/loser", playerControler.getPlayerLowerVictoryRate);

  return router;
};
module.exports = playerRouter;
