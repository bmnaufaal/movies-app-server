const BookmarkController = require("../controllers/bookmarkController");
const CostumerController = require("../controllers/customerController");
const customerAuthentication = require("../middlewares/customerAuthentication");

const customerRouter = require("express").Router();

customerRouter.post("/register", CostumerController.register);
customerRouter.post("/login", CostumerController.login);
customerRouter.post("/google-sign-in", CostumerController.googleSignIn);
customerRouter.get("/movies", CostumerController.findAll);
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

module.exports = customerRouter;
