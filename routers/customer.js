const BookmarkController = require("../controllers/bookmarkController");
const CostumerController = require("../controllers/customerController");
const GenreController = require("../controllers/genreController");
const customerAuthentication = require("../middlewares/customerAuthentication");
const customerAuthorization = require("../middlewares/customerAuthorization");

const customerRouter = require("express").Router();

customerRouter.post("/register", CostumerController.register);
customerRouter.post("/login", CostumerController.login);
customerRouter.post("/google-sign-in", CostumerController.googleSignIn);
customerRouter.get("/movies", CostumerController.findAll);
customerRouter.get("/genres", GenreController.findAll);
customerRouter.get("/moviesMaxLength", CostumerController.findMaxLength);
customerRouter.get("/movies/:id", CostumerController.findOne);

customerRouter.get(
  "/bookmarks",
  customerAuthentication,
  BookmarkController.findAll
);

customerRouter.post(
  "/bookmarks/add",
  customerAuthentication,
  BookmarkController.create
);

customerRouter.get(
  "/bookmarks/:id",
  customerAuthentication,
  customerAuthorization,
  BookmarkController.findOne
);

customerRouter.delete(
  "/bookmarks/:id",
  customerAuthentication,
  customerAuthorization,
  BookmarkController.delete
);

module.exports = customerRouter;
