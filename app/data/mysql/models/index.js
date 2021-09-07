// This file is needed so the models share the same connection.
// And have a relation established

const Player = require("./Player");
const Game = require("./Game");

const models = {
  Player,
  Game,
};

Player.hasMany(Game);
Game.belongsTo(Player);

module.exports = models;
