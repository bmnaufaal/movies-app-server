"use strict";
const { hashPassword, comparePassword } = require("../helpers/bcrypt");
const { createToken } = require("../helpers/jwt");
const { User, Movie, Genre } = require("../models");
const { OAuth2Client } = require("google-auth-library");
const { generatePassword } = require("../helpers/format");
const { Op } = require("sequelize");

class CustomerController {
  static async register(req, res, next) {
    try {
      let { username, email, password, phoneNumber, address } = req.body;
      const createdUser = await User.create({
        username,
        email,
        password,
        role: "Customer",
        phoneNumber,
        address,
      });
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
      if (!email) throw { name: "InvalidEmail" };
      if (!password) throw { name: "InvalidPassword" };

      const userFound = await User.findOne({
        where: {
          email: email,
          role: "Customer",
        },
      });

      if (!userFound || !comparePassword(password, userFound.password)) {
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

  static async googleSignIn(req, res, next) {
    try {
      const { token_google } = req.headers;
      const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
      const ticket = await client.verifyIdToken({
        idToken: token_google,
        audience: process.env.GOOGLE_CLIENT_ID, // Specify the CLIENT_ID of the app that accesses the backend
        // Or, if multiple clients access the backend:
        //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
      });
      const payload = ticket.getPayload();

      const [user, created] = await User.findOrCreate({
        where: {
          email: payload.email,
          role: "Customer",
        },
        defaults: {
          username: payload.name.split(" ").join("").toLowerCase(),
          email: payload.email,
          password: generatePassword(),
          role: "Customer",
        },
        hooks: false,
      });

      const newPlayload = {
        id: user.id,
      };

      const access_token = createToken(newPlayload);
      res.status(200).json({
        access_token: access_token,
      });
    } catch (error) {
      next(error);
    }
  }

  static async findAll(req, res, next) {
    try {
      const { filter, page } = req.query;
      let limit;
      let offset;
      const paramQuerySQL = {
        order: [["id", "ASC"]],
        include: [
          {
            model: Genre,
            attributes: ["id", "name"],
          },
          {
            model: User,
            as: "Author",
            attributes: ["id", "username", "email", "role"],
          },
        ],
      };

      if (filter) {
        const query = filter.genre.split(",").map((item) => ({
          [Op.eq]: item,
        }));

        paramQuerySQL.where = {
          genreId: { [Op.or]: query },
        };
      }

      if (page) {
        if (page.number) {
          limit = page.size;
          paramQuerySQL.limit = limit;
        }
        if (page.size) {
          offset = page.number * limit - limit;
          paramQuerySQL.offset = offset;
        }
      } else {
        limit = 3; // limit 3 item
        offset = 0;
        paramQuerySQL.limit = limit;
        paramQuerySQL.offset = offset;
      }

      const movies = await Movie.findAll(paramQuerySQL);
      res.status(200).json(movies);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = CustomerController;
