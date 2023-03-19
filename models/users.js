"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      // using the hasMany() method from the Users model to add a one to many relationship
      // between the users and the Todos since a single user can have may todos
      Users.hasMany(models.Todos)
    }
  }
  Users.init(
    {
      // adding allow null as false for not accepting null values
      firstName: { type: DataTypes.STRING, allowNull: false },
      lastName: DataTypes.STRING,

      // adding allow null as false for not accepting null values
      // allowing unique values only when the user enters an email
      email: { type: DataTypes.STRING, allowNull: false, unique: true },

      // adding allow null as false for not accepting null values
      password: { type: DataTypes.STRING, allowNull: false },
    },
    {
      sequelize,
      modelName: "Users",
    }
  );
  return Users;
};
