const { Bookmark } = require("../models");

async function customerAuthorization(req, res, next) {
  try {
    const BookmarkId = req.params.id;
    const CustomerId = req.customer.id;
    const bookmark = await Bookmark.findByPk(BookmarkId);
    if (!bookmark) throw { name: "BookmarkNotFound" };
    if (CustomerId !== bookmark.CustomerId) throw { name: "Forbidden" };
    next();
  } catch (error) {
    next(error);
  }
}

module.exports = customerAuthorization;
