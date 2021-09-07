const calcVictoryRate = async (numberOfGames, numberOfVictories) => {
  const victoryRate = parseFloat(
    (100 * numberOfVictories) / numberOfGames
  ).toFixed(2);
  return victoryRate;
};

module.exports = calcVictoryRate;
