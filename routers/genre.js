const GenreController = require("../controllers/genreController");
const authentication = require("../middlewares/authentication");

const router = require("express").Router();

router.get("/genres", authentication, GenreController.findAll);

module.exports = router;
