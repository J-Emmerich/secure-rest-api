const { Model, DataTypes } = require("sequelize");

// conditional added to run both dialects with same models.

let sequelize;

if (process.env.DB === "mysql") {
  sequelize = require("../connection");
} else {
  sequelize = require("../../sqlite/connection");
}
// const { sequelize } = require("../../database-access");

class Game extends Model {}

Game.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true
    },
    diceOne: {
      type: DataTypes.INTEGER
    },
    diceTwo: {
      type: DataTypes.INTEGER
    },
    result: {
      type: DataTypes.BOOLEAN
    }
  },
  {
    sequelize,
    timestamps: false,
    modelName: "Game"
  }
);

module.exports = Game;
