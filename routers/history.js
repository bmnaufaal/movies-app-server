const HistoryController = require("../controllers/historyController");
const authentication = require("../middlewares/authentication");

const historyRouter = require("express").Router();

historyRouter.use(authentication);
historyRouter.get("/", HistoryController.findAll);

module.exports = historyRouter;
