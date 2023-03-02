"use strict";
const { Movie, Customer, Bookmark } = require("../models");

class BookmarkController {
  static async findAll(req, res, next) {
    try {
      const id = req.customer.id;
      const bookmarks = await Bookmark.findAll({
        where: {
          CustomerId: id,
        },
      });
      res.status(200).json(bookmarks);
    } catch (error) {
      next(error);
    }
  }

  static async create(req, res, next) {
    try {
      const { CustomerId, MovieId } = req.body;
      const foundCustomer = await Customer.findByPk(CustomerId);
      if (!foundCustomer) throw { name: "CustomerNotFound" };
      const foundMovie = await Movie.findByPk(MovieId);
      if (!foundMovie) throw { name: "MovieNotFound" };

      const createdBookmark = await Bookmark.create({
        CustomerId,
        MovieId,
      });
      res.status(201).json(createdBookmark);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = BookmarkController;
