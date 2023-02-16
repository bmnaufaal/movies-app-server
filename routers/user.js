const UserController = require("../controllers/userController");

const userRouter = require("express").Router();

userRouter.post("/register", UserController.register);
userRouter.post("/login", UserController.login);
userRouter.post("/google-sign-in", UserController.googleSignIn);

module.exports = userRouter;
