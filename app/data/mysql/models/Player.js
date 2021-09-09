const { DataTypes, Model } = require("sequelize");
const sequelize = require("../connection");

class Player extends Model {}

Player.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    dateOfRegister: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    timestamps: false,
    modelName: "Player",
  }
);

module.exports = Player;
