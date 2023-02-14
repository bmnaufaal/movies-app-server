"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Author extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Author.hasMany(models.Movie, {
        foreignKey: "authorId",
      });
    }
  }
  Author.init(
    {
      name: {
        allowNull: false,
        type: DataTypes.STRING,
        validate: {
          notNull: {
            msg: "Author name should not be null",
          },
          notEmpty: {
            msg: "Author name should not be empty",
          },
        },
      },
      dateOfBirth: {
        allowNull: false,
        type: DataTypes.DATE,
        validate: {
          notNull: {
            msg: "Date of birth should not be null",
          },
          notEmpty: {
            msg: "Date of birth should not be empty",
          },
        },
      },
      email: {
        allowNull: false,
        unique: true,
        type: DataTypes.STRING,
        validate: {
          notNull: {
            msg: "Email should not be null",
          },
          notEmpty: {
            msg: "Email should not be empty",
          },
          isEmail: {
            msg: "Email should be email format",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "Author",
    }
  );
  return Author;
};
