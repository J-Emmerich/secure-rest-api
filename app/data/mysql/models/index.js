const User = require("./User");
const Game = require("./Game");

const models = {
  User,
  Game,
};

User.hasMany(Game);
Game.belongsTo(User);

module.exports = models;
