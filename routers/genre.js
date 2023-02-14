const GenreController = require("../controllers/genreController");
const authentication = require("../middlewares/authentication");

const genreRouter = require("express").Router();

genreRouter.use(authentication);
genreRouter.get("/", GenreController.findAll);

module.exports = genreRouter;
