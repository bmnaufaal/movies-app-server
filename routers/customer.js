const CostumerController = require("../controllers/customerController");

const customerRouter = require("express").Router();

customerRouter.post("/register", CostumerController.register);
customerRouter.post("/login", CostumerController.login);
customerRouter.post("/google-sign-in", CostumerController.googleSignIn);

module.exports = customerRouter;
