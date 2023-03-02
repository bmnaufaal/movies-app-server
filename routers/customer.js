const CostumerController = require("../controllers/customerController");
const customerAuthentication = require("../middlewares/customerAuthentication");

const customerRouter = require("express").Router();

customerRouter.post("/register", CostumerController.register);
customerRouter.post("/login", CostumerController.login);
customerRouter.post("/google-sign-in", CostumerController.googleSignIn);
customerRouter.get(
  "/movies",
  customerAuthentication,
  CostumerController.findAll
);
customerRouter.get(
  "/movies/:id",
  customerAuthentication,
  CostumerController.findOne
);

module.exports = customerRouter;
