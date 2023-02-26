const { Movie, Genre } = require("../models");

async function movieAuthorization(req, res, next) {
  try {
    let movieId = req.params.id;
    let movie = await Movie.findByPk(movieId);
    if (!movie) throw { name: "MovieNotFound" };
    if (req.user.role !== "Admin") throw { name: "Forbidden" };
    next();
  } catch (error) {
    next(error);
  }
}

async function genreAuthorization(req, res, next) {
  try {
    let genreId = req.params.id;
    let genre = await Genre.findByPk(genreId);
    if (!genre) throw { name: "GenreNotFound" };
    if (req.user.role !== "Admin") throw { name: "Forbidden" };
    next();
  } catch (error) {
    next(error);
  }
}

module.exports = { movieAuthorization, genreAuthorization };
