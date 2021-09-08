const calcVictoryRate = async (games) => {
  if (games.length > 0) {
    const numberOfVictories = games
      .map((game) => game.result)
      .filter((result) => result);

    const victoryRate = parseFloat(
      (100 * numberOfVictories.length) / games.length
    ).toFixed(2);

    return victoryRate;
  }
  return 0;
};

module.exports = calcVictoryRate;
