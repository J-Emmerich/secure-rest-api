const calcVictoryRate = async (games) => {
  const numberOfVictories = games
    .map((game) => game.result)
    .filter((result) => result);

  const victoryRate = parseFloat(
    (100 * numberOfVictories.length) / games.length
  ).toFixed(2);
  return victoryRate;
};

module.exports = calcVictoryRate;
