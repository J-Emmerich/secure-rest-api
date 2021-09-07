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

router.post("/:id/games", playOneGame);
router.post("/", registerNewPlayer);
router.put("/", updateOnePlayerName);
router.delete("/:id/games", deletePlayerGames);

router.get("/:id/games", getOnePlayerGames);
router.get("/", getAllPlayers);

router.get("/ranking", getAllPlayersRanking);
router.get("/ranking/winner", getPlayerHigherVictoryRate);
router.get("/ranking/loser", getPlayerLowerVictoryRate);
module.exports = router;
