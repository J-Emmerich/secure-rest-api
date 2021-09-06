// This file validates the object that goes into the DB. All validation ocurrs here, not in DB-layer.

const { v4: uuidv4 } = require("uuid");

function getRandomInt(minReceived, maxReceived) {
  const min = Math.ceil(minReceived);
  const max = Math.floor(maxReceived);
  return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
}

function gameResult(diceOne, diceTwo) {
  if (diceOne + diceTwo === 7) {
    return true;
  }
  return false;
}
async function play(playerId) {
  const diceOne = getRandomInt(1, 7);
  const diceTwo = getRandomInt(1, 7);
  const result = gameResult(diceOne, diceTwo);
  const id = uuidv4();
  const game = {
    id,
    diceOne,
    diceTwo,
    result,
    playerId,
  };
  return Object.freeze(game);
}

module.exports = { play, gameResult };
