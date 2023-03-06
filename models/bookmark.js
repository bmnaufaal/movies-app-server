"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Bookmark extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Bookmark.belongsTo(models.Customer);
      Bookmark.belongsTo(models.Movie);
    }
  }
  Bookmark.init(
    {
      CustomerId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        validate: {
          notNull: {
            msg: "Customer id should not be null",
          },
          notEmpty: {
            msg: "Customer id should not be empty",
          },
        },
      },
      MovieId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        validate: {
          notNull: {
            msg: "Movie id should not be null",
          },
          notEmpty: {
            msg: "Movie id should not be empty",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "Bookmark",
    }
  );
  return Bookmark;
};
