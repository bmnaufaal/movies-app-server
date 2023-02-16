"use strict";
const { Movie, Genre, User } = require("../models");

class GenreController {
  static async findAll(req, res, next) {
    try {
      const genres = await Genre.findAll({
        order: [["id", "ASC"]],
      });
      res.status(200).json(genres);
    } catch (error) {
      next(error);
    }
  }

  static async create(req, res, next) {
    try {
      const { name } = req.body;
      let createdGenre = await Genre.create({ name });
      res.status(201).json(createdGenre);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = GenreController;
