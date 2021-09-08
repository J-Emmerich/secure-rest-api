const calcVictoryRate = require("./calc-victory-rate");

async function assignVictoryRateToPlayer(player) {
  const victoryRate = await calcVictoryRate(player.Games);
  const victory = {
    victoryRatePercentage: victoryRate,
  };
  Object.assign(player, victory);
  return player;
}

module.exports = assignVictoryRateToPlayer;
