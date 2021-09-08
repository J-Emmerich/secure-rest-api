const express = require("express");
const {
  registerNewPlayer,
  getAllPlayers,
  updateOnePlayerName,
  getOnePlayerGames,
  playOneGame,
  deletePlayerGames,
  getAllPlayersRanking,
  getPlayerLowerVictoryRate,
  getPlayerHigherVictoryRate,
} = require("../controllers/player-controller");

const router = express.Router();

router.get("/", getAllPlayers);
router.put("/", updateOnePlayerName);
router.post("/", registerNewPlayer);

router.get("/:id/games", getOnePlayerGames);
router.post("/:id/games", playOneGame);
router.delete("/:id/games", deletePlayerGames);

router.get("/ranking", getAllPlayersRanking);
router.get("/ranking/winner", getPlayerHigherVictoryRate);
router.get("/ranking/loser", getPlayerLowerVictoryRate);
module.exports = router;
