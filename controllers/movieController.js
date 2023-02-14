"use strict";
const { Movie, Genre, Author } = require("../models");

class MovieController {
  static async findAll(req, res) {
    try {
      const movies = await Movie.findAll();
      res.status(200).json(movies);
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "Internal Server Error",
      });
    }
  }

  static async create(req, res) {
    const { title, synopsis, trailerUrl, imgUrl, rating, genreId, authorId } =
      req.body;
    try {
      let createdMovie = await Movie.create({
        title,
        synopsis,
        trailerUrl,
        imgUrl,
        rating,
        genreId,
        authorId,
      });
      res.status(201).json(createdMovie);
    } catch (error) {
      console.log(error);
      if (error.name === "SequelizeValidationError") {
        error = error.errors.map((element) => {
          return element.message;
        });
        res.status(400).json({
          message: error,
        });
      } else {
        res.status(500).json({
          message: "Internal Server Error",
        });
      }
    }
  }

  static async findOne(req, res) {
    const { id } = req.params;
    try {
      let foundMovie = await Movie.findByPk(id);
      if (!foundMovie) {
        throw "Movie Not Found";
      }
      res.status(200).json(foundMovie);
    } catch (error) {
      console.log(error);
      res.status(404).json({
        message: error,
      });
    }
  }

  static async delete(req, res) {
    const { id } = req.params;
    try {
      let foundMovie = await Movie.findByPk(id);
      if (!foundMovie) {
        throw "Movie Not Found";
      }
      let deletedMovie = await Movie.destroy({
        where: {
          id: id,
        },
      });
      console.log(deletedMovie);
      res.status(200).json({
        message: `${foundMovie.title} success to delete`,
      });
    } catch (error) {
      console.log(error);
      res.status(404).json({
        message: error,
      });
    }
  }

  static async findAllDetail(req, res) {
    try {
      const movies = await Movie.findAll({
        include: [Genre, Author],
      });
      res.status(200).json(movies);
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "Internal Server Error",
      });
    }
  }
}

module.exports = MovieController;
