const { Sequelize, DataTypes, Model } = require("sequelize");
const sequelize = require("../connection");

class User extends Model {}

User.init({
  name: {
    type: DataTypes.STRING,
    allowNull: false,
     },
  dateOfRegister: DataTypes.
 })