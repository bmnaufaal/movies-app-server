"use strict";
const { hashPassword, comparePassword } = require("../helpers/bcrypt");
const { createToken } = require("../helpers/jwt");
const { User } = require("../models");

class UserController {
  static async register(req, res) {
    try {
      let { email, password } = req.body;
      const createdUser = await User.create({ email, password });
      res.status(201).json({
        id: createdUser.id,
        email: createdUser.email,
      });
    } catch (error) {
      console.log(error);
      switch (error.name) {
        case "SequelizeUniqueConstraintError":
        case "SequelizeValidationError":
          error = error.errors.map((element) => {
            return element.message;
          });
          res.status(400).json({
            message: error,
          });
          break;
        default:
          res.status(500).json({
            message: "Internal Server Error",
          });
          break;
      }
    }
  }

  static async login(req, res) {
    try {
      const { email, password } = req.body;
      const userFound = await User.findOne({
        where: {
          email: email,
        },
      });
      if (!userFound) {
        throw { name: "InvalidCredentials" };
      }

      const validatePassword = comparePassword(password, userFound.password);
      if (!validatePassword) {
        throw { name: "InvalidCredentials" };
      }

      const payload = {
        id: userFound.id,
      };
      const accessToken = createToken(payload);
      res.status(200).json({
        accessToken: accessToken,
      });
    } catch (error) {
      switch (error.name) {
        case "InvalidCredentials":
          res.status(300).json({
            message: "Invalid Usernamme / Password",
          });
          break;
        default:
          console.log(error);
          res.status(500).json({
            message: "Internal Server Error",
          });
          break;
      }
    }
  }
}

module.exports = UserController;
