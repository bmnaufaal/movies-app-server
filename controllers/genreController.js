"use strict";
const { Movie, Genre, User, History } = require("../models");

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

  static async findOne(req, res, next) {
    const { id } = req.params;
    try {
      let foundGenre = await Genre.findByPk(id);
      if (!foundGenre) {
        throw { name: "GenreNotFound" };
      }
      res.status(200).json(foundGenre);
    } catch (error) {
      next(error);
    }
  }

  static async create(req, res, next) {
    try {
      const { name } = req.body;
      let createdGenre = await Genre.create({ name });
      res.status(201).json(createdGenre);
      await History.create({
        name: "POST",
        description: `New Genre with id ${createdGenre.id} created`,
        updatedBy: req.user.username,
      });
    } catch (error) {
      next(error);
    }
  }

  static async delete(req, res, next) {
    const { id } = req.params;
    try {
      let foundGenre = await Genre.findByPk(id);
      if (!foundGenre) {
        throw { name: "GenreNotFound" };
      }
      let deletedGenre = await Genre.destroy({
        where: {
          id: id,
        },
      });
      console.log(deletedGenre);
      res.status(200).json({
        message: `${foundGenre.name} success to delete`,
      });
    } catch (error) {
      next(error);
    }
  }

  static async update(req, res, next) {
    const { id } = req.params;
    const { name } = req.body;
    try {
      let foundGenre = await Genre.findByPk(id);
      if (!foundGenre) {
        throw { name: "GenreNotFound" };
      }
      let updatedGenre = await Genre.update(
        { name },
        {
          where: {
            id: id,
          },
        }
      );
      console.log(updatedGenre);
      await History.create({
        name: "PUT",
        description: `Genre with id ${id} updated`,
        updatedBy: req.user.username,
      });
      res.status(200).json({
        message: `${foundGenre.name} success to edit`,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = GenreController;
