async function play() {
  const dice = getRandomInt(1, 7);
  const dice2 = getRandomInt(1, 7);
  const result = gameResult(dice, dice2);
  const game = {
    dice,
    dice2,
    result
  };
  return Object.freeze(game);
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}

function gameResult(diceOne, diceTwo) {
  if (diceOne + diceTwo === 7) {
    return true;
  }
  return false;
}

module.exports = { play, gameResult };
