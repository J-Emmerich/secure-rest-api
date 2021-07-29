const { DataTypes, Model } = require("sequelize");
const sequelize = require("../connection");

class User extends Model {}

User.init(
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
    modelName: "User",
  }
);

module.exports = User;
