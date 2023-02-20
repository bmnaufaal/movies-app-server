"use strict";
const { Movie, Genre, User } = require("../models");

class MovieController {
  static async findAll(req, res, next) {
    try {
      const movies = await Movie.findAll({
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
      res.status(200).json(movies);
    } catch (error) {
      next(error);
    }
  }

  static async findOne(req, res, next) {
    const { id } = req.params;
    try {
      let foundMovie = await Movie.findByPk(id, {
        include: [
          Genre,
          {
            model: User,
            as: "Author",
            attributes: ["id", "username", "email", "role"],
          },
        ],
      });
      if (!foundMovie) {
        throw { name: "MovieNotFound" };
      }
      res.status(200).json(foundMovie);
    } catch (error) {
      next(error);
    }
  }

  static async create(req, res, next) {
    try {
      const { title, synopsis, trailerUrl, imgUrl, rating, genreId } = req.body;
      const authorId = req.user.id;
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

  static async update(req, res, next) {
    const { id } = req.params;
    const { title, synopsis, trailerUrl, imgUrl, rating, genreId, authorId, status } =
      req.body;
    try {
      let foundMovie = await Movie.findByPk(id);
      if (!foundMovie) {
        throw { name: "MovieNotFound" };
      }
      let updatedMovie = await Movie.update(
        {
          title: title,
          synopsis: synopsis,
          trailerUr: trailerUrl,
          imgUrl: imgUrl,
          rating: rating,
          genreId: genreId,
          authorId: authorId,
          status: status
        },
        {
          where: {
            id: id,
          },
        }
      );
      console.log(updatedMovie);
      res.status(200).json({
        message: `${foundMovie.title} success to edit`,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = MovieController;
