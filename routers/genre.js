const GenreController = require("../controllers/genreController");
const authentication = require("../middlewares/authentication");
const { genreAuthorization } = require("../middlewares/authorization");

const genreRouter = require("express").Router();

genreRouter.use(authentication);
genreRouter.get("/", GenreController.findAll);
genreRouter.get("/:id", GenreController.findOne);
genreRouter.post("/add", GenreController.create);
genreRouter.delete("/:id", genreAuthorization, GenreController.delete);
genreRouter.put("/:id", genreAuthorization, GenreController.update);

module.exports = genreRouter;
