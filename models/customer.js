"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Customer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Customer.hasMany(models.Bookmark);
    }
  }
  Customer.init(
    {
      fullName: DataTypes.STRING,
      email: {
        allowNull: false,
        type: DataTypes.STRING,
        unique: {
          arg: true,
          msg: "This email is already taken",
        },
        validate: {
          isEmail: {
            msg: "Email should be email format",
          },
          notNull: {
            msg: "Email should not be null",
          },
          notEmpty: {
            msg: "Email should not be empty",
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
      phoneNumber: DataTypes.STRING,
      address: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Customer",
    }
  );
  return Customer;
};
