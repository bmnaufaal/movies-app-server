const { Movie } = require("../models");

async function authorization(req, res, next) {
  try {
    let movieId = req.params.id;
    let movie = await Movie.findByPk(movieId);
    if (!movie) throw { name: "MovieNotFound" };
    if (req.user.role !== "Admin")
      throw { name: "Forbidden" };
    next();
  } catch (error) {
    next(error);
  }
}

module.exports = authorization;
