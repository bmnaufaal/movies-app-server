"use strict";
const { History } = require("../models");

class HistoryController {
  static async findAll(req, res, next) {
    try {
      const histories = await History.findAll({
        order: [["id", "ASC"]],
      });
      res.status(200).json(histories);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = HistoryController;
