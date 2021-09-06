const Player = require("./Player");
const Game = require("./Game");

const models = {
  Player,
  Game,
};

Player.hasMany(Game);
Game.belongsTo(Player);

module.exports = models;
