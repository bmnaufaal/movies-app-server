const MovieController = require("../controllers/movieController");
const authentication = require("../middlewares/authentication");
const authorization = require("../middlewares/authorization");

const movieRouter = require("express").Router();

movieRouter.use(authentication);
movieRouter.get("/", MovieController.findAll);
movieRouter.get("/:id", MovieController.findOne);
movieRouter.post("/add", MovieController.create);
movieRouter.delete("/:id", authorization, MovieController.delete);

module.exports = movieRouter;
