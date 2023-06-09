"use strict";
const { hashPassword, comparePassword } = require("../helpers/bcrypt");
const { createToken } = require("../helpers/jwt");
const { Customer, User, Movie, Genre } = require("../models");
const { OAuth2Client } = require("google-auth-library");
const { generatePassword } = require("../helpers/format");
const { Op } = require("sequelize");
const movie = require("../models/movie");

class CustomerController {
  static async register(req, res, next) {
    try {
      let { email, password } = req.body;

      const createdUser = await Customer.create({
        email: email,
        password: password,
        role: "Customer",
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

      const customerFound = await Customer.findOne({
        where: {
          email: email,
        },
      });

      if (
        !customerFound ||
        !comparePassword(password, customerFound.password)
      ) {
        throw { name: "InvalidCredentials" };
      }

      const payload = {
        id: customerFound.id,
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
        audience: process.env.GOOGLE_CLIENT_ID,
        // Specify the CLIENT_ID of the app that accesses the backend
        // Or, if multiple clients access the backend:
        //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
      });
      const payload = ticket.getPayload();

      const [customer, created] = await Customer.findOrCreate({
        where: {
          email: payload.email,
        },
        defaults: {
          email: payload.email,
          password: generatePassword(),
          role: "Customer",
        },
        hooks: false,
      });

      const newPlayload = {
        id: customer.id,
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
      const { filter, page, size } = req.query;
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
        where: {
          status: { [Op.eq]: "Active" },
        },
      };

      if (filter) {
        const query = filter.split(",").map((item) => ({
          [Op.eq]: item,
        }));

        paramQuerySQL.where = {
          status: { [Op.eq]: "Active" },
          genreId: { [Op.or]: query },
        };
      }

      if (page && size) {
        limit = size;
        offset = page * limit - limit;
        paramQuerySQL.limit = limit;
        paramQuerySQL.offset = offset;
      }

      const movies = await Movie.findAll(paramQuerySQL);
      res.status(200).json(movies);
    } catch (error) {
      next(error);
    }
  }

  static async findMaxLength(req, res, next) {
    try {
      const { filter } = req.query;
      const paramQuerySQL = {};

      if (filter) {
        const query = filter.split(",").map((item) => ({
          [Op.eq]: item,
        }));

        paramQuerySQL.where = {
          status: { [Op.eq]: "Active" },
          genreId: { [Op.or]: query },
        };
      }

      const movies = await Movie.findAll(paramQuerySQL);
      const moviesLength = movies.length;
      res.status(200).json({
        message: moviesLength,
      });
    } catch (error) {
      next(error);
    }
  }

  static async findOne(req, res, next) {
    try {
      const { id } = req.params;
      const foundMovie = await Movie.findByPk(id, {
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
      });
      if (!foundMovie) throw { name: "MovieNotFound" };
      res.status(200).json(foundMovie);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = CustomerController;
