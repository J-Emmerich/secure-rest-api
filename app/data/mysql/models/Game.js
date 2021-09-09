const { Model, DataTypes } = require("sequelize");
const sequelize = require("../connection");

class Game extends Model {}

Game.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
    },
    diceOne: {
      type: DataTypes.INTEGER,
    },
    diceTwo: {
      type: DataTypes.INTEGER,
    },
    result: {
      type: DataTypes.BOOLEAN,
    },
  },
  {
    sequelize,
    timestamps: false,
    modelName: "Game",
  }
);

module.exports = Game;
