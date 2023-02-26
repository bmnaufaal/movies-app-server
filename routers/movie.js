const MovieController = require("../controllers/movieController");
const authentication = require("../middlewares/authentication");
const { movieAuthorization } = require("../middlewares/authorization");

const movieRouter = require("express").Router();

movieRouter.use(authentication);
movieRouter.get("/", MovieController.findAll);
movieRouter.get("/:id", MovieController.findOne);
movieRouter.post("/add", MovieController.create);
movieRouter.delete("/:id", movieAuthorization, MovieController.delete);
movieRouter.put("/:id", movieAuthorization, MovieController.update);
movieRouter.patch("/:id", movieAuthorization, MovieController.updateStatus);

module.exports = movieRouter;
