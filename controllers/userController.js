"use strict";
const { hashPassword, comparePassword } = require("../helpers/bcrypt");
const { createToken } = require("../helpers/jwt");
const { User } = require("../models");

class UserController {
  static async register(req, res, next) {
    try {
      let { email, password } = req.body;
      const createdUser = await User.create({ email, password });
      res.status(201).json({
        id: createdUser.id,
        email: createdUser.email,
      });
    } catch (error) {
      next(error);
    }
  }

  static async login(req, res, next) {
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
      const access_token = createToken(payload);
      res.status(200).json({
        access_token: access_token,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = UserController;
