"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Todos extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      // using the belongsTo() method to add a relationship between the todos model
      // the users model
      
      Todos.belongsTo(models.Users, {
        // the code below is used to not allow null values to the userId foreign key
        foreignKey: {
          allowNull: false,
        },
      });
    }
  }
  Todos.init(
    {
      // the value of allowNull is false to not allow null values
      // and the defaultvalue is false for isDone to have a default value
      title: { type: DataTypes.STRING, allowNull: false },
      isDone: { type: DataTypes.BOOLEAN, defaultValue: false },
    },
    {
      sequelize,
      modelName: "Todos",
    }
  );
  return Todos;
};
