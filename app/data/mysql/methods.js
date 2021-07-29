const { User, Game } = require("./models/index");

async function create(user) {
  try {
    const newUser = await User.create(user);
    return newUser.toJSON();
  } catch (err) {
    return err;
  }
}

async function createGame({ id, diceOne, diceTwo, result, UserId }) {
  try {
    const newGame = await Game.create({ id, diceOne, diceTwo, result, UserId });
    return newGame;
  } catch (err) {
    return err;
  }
}

async function find() {
  const users = await User.findAll();
  return JSON.stringify(users);
}

module.exports = { create, find, createGame };
