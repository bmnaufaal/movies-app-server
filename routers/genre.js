const GenreController = require("../controllers/genreController");
const authentication = require("../middlewares/authentication");
const authorization = require("../middlewares/authorization");

const genreRouter = require("express").Router();

genreRouter.use(authentication);
genreRouter.get("/", GenreController.findAll);
genreRouter.post("/add", GenreController.create);
genreRouter.delete("/:id", authorization, GenreController.delete);
genreRouter.put("/:id", authorization, GenreController.update);

module.exports = genreRouter;
