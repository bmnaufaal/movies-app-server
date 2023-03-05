"use strict";
const { Movie, Genre, User, Customer, Bookmark } = require("../models");

class BookmarkController {
  static async findAll(req, res, next) {
    try {
      const id = req.customer.id;
      const bookmarks = await Bookmark.findAll({
        where: {
          CustomerId: id,
        },
        include: [
          {
            model: Movie,
            include: [
              {
                model: User,
                as: "Author",
                attributes: ["id", "username", "email", "role"],
              },
              {
                model: Genre,
                attributes: ["id", "name"],
              },
            ],
          },
        ],
      });
      res.status(200).json(bookmarks);
    } catch (error) {
      next(error);
    }
  }

  static async findOne(req, res, next) {
    try {
      const { id } = req.params;
      const foundBookmark = await Bookmark.findByPk(id, {
        include: [
          {
            model: Movie,
            include: [
              {
                model: User,
                as: "Author",
                attributes: ["id", "username", "email", "role"],
              },
              {
                model: Genre,
                attributes: ["id", "name"],
              },
            ],
          },
        ],
      });
      if (!foundBookmark) throw { name: "BookmarkNotFound" };

      res.status(200).json(foundBookmark);
    } catch (error) {
      next(error);
    }
  }

  static async create(req, res, next) {
    try {
      const { MovieId } = req.body;
      const CustomerId = req.customer.id;
      const foundCustomer = await Customer.findByPk(CustomerId);
      if (!foundCustomer) throw { name: "CustomerNotFound" };
      const foundMovie = await Movie.findByPk(MovieId);
      if (!foundMovie) throw { name: "MovieNotFound" };

      const foundBookmark = await Bookmark.findOne({
        where: {
          CustomerId: CustomerId,
          MovieId: MovieId,
        },
      });

      if (foundBookmark) throw { name: "AlreadyBookmarked" };

      const createdBookmark = await Bookmark.create({
        CustomerId,
        MovieId,
      });
      res.status(201).json(createdBookmark);
    } catch (error) {
      next(error);
    }
  }

  static async delete(req, res, next) {
    try {
      const { id } = req.params;
      const foundBookmark = await Bookmark.findByPk(id);
      if (!foundBookmark) throw { name: "BookmarkNotFound" };

      const deletedBookmark = await Bookmark.destroy({
        where: {
          id: id,
        },
      });

      res.status(200).json({
        message: `Success delete bookmark`,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = BookmarkController;
