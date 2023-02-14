"use strict";
const { Movie, Genre, User } = require("../models");

class GenreController {
    static async findAll(req, res, next) {
        try {
          const genres = await Genre.findAll();
          res.status(200).json(genres);
        } catch (error) {
          next(error);
        }
      }
}

module.exports = GenreController