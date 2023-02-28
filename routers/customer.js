const CostumerController = require("../controllers/customerController");
const authentication = require("../middlewares/authentication");

const customerRouter = require("express").Router();

customerRouter.post("/register", CostumerController.register);
customerRouter.post("/login", CostumerController.login);
customerRouter.post("/google-sign-in", CostumerController.googleSignIn);
customerRouter.get("/movies", authentication, CostumerController.findAll);

module.exports = customerRouter;
