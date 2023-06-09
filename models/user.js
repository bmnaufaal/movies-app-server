"use strict";
const { Model } = require("sequelize");
const { hashPassword } = require("../helpers/bcrypt");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Movie, {
        foreignKey: "authorId",
        as: "Author",
      });
    }
  }
  User.init(
    {
      username: {
        allowNull: false,
        type: DataTypes.STRING,
        validate: {
          notNull: {
            msg: "Username should not be null",
          },
          notEmpty: {
            msg: "Username should not be empty",
          },
        },
      },
      email: {
        allowNull: false,
        unique: {
          arg: true,
          msg: "This email is already taken",
        },
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
      password: {
        allowNull: false,
        type: DataTypes.STRING,
        validate: {
          notNull: {
            msg: "Password should not be null",
          },
          notEmpty: {
            msg: "Password should not be empty",
          },
        },
      },
      role: {
        allowNull: false,
        type: DataTypes.STRING,
        validate: {
          notNull: {
            msg: "Role should not be null",
          },
          notEmpty: {
            msg: "Role should not be empty",
          },
        },
      },
      phoneNumber: DataTypes.STRING,
      address: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "User",
    }
  );

  User.beforeCreate((user, options) => {
    user.password = hashPassword(user.password);
  });

  return User;
};
