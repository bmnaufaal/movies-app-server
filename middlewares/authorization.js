const { Movie } = require("../models");

async function authorization(req, res, next) {
  try {
    let movieId = req.params.id;
    let movie = await Movie.findByPk(movieId);
    if (!movie) throw { name: "NotFound" };
    if (req.user.id !== movie.authorId && req.user.role !== 'admin') throw { name: "Forbidden" };

    next();
  } catch (error) {
    next(error);
  }
}

module.exports = authorization;
