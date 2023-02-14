"use strict";
const { Movie, Genre } = require("../models");

class MovieController {
  static async findAll(req, res, next) {
    try {
      const movies = await Movie.findAll();
      res.status(200).json(movies);
    } catch (error) {
      next(error);
    }
  }

  static async create(req, res, next) {
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
      next(error);
    }
  }

  static async findOne(req, res, next) {
    const { id } = req.params;
    try {
      let foundMovie = await Movie.findByPk(id);
      if (!foundMovie) {
        throw { name: "NotFound" };
      }
      res.status(200).json(foundMovie);
    } catch (error) {
      next(error);
    }
  }

  static async delete(req, res, next) {
    const { id } = req.params;
    try {
      let foundMovie = await Movie.findByPk(id);
      if (!foundMovie) {
        throw { name: "NotFound" };
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
      next(error);
    }
  }

  static async findAllDetail(req, res, next) {
    try {
      const movies = await Movie.findAll({
        include: [ Genre ],
      });
      res.status(200).json(movies);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = MovieController;
