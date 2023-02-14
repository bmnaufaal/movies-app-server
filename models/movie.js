"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Movie extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Movie.belongsTo(models.Genre, {
        foreignKey: "genreId",
      });
      Movie.belongsTo(models.Author, {
        foreignKey: "authorId",
      });
    }
  }
  Movie.init(
    {
      title: {
        allowNull: false,
        type: DataTypes.STRING,
        validate: {
          notNull: {
            msg: "Title should not be null",
          },
          notEmpty: {
            msg: "Title should not be empty",
          },
        },
      },
      synopsis: {
        allowNull: false,
        type: DataTypes.STRING,
        validate: {
          notNull: {
            msg: "Synopsis should not be null",
          },
          notEmpty: {
            msg: "Synopsis should not be empty",
          },
        },
      },
      trailerUrl: DataTypes.STRING,
      imgUrl: DataTypes.STRING,
      rating: {
        allowNull: false,
        type: DataTypes.INTEGER,
        validate: {
          isGreaterThanOne(value) {
            if (+value < 1) {
              throw new Error("Minimum rating is 1");
            }
          },
        },
      },
      genreId: DataTypes.INTEGER,
      authorId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Movie",
    }
  );
  return Movie;
};
