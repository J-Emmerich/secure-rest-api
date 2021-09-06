const express = require("express");
const {
  registerNewPlayer,
  getAllPlayers,
  updatePlayerName,
  getOnePlayer,
  playOneGame,
} = require("../controllers/player-controller");

const router = express.Router();

router.post("/", registerNewPlayer);
router.get("/", getAllPlayers);
router.put("/", updatePlayerName);

router.get("/:id", getOnePlayer);
router.post("/:id/games", playOneGame);

module.exports = router;
