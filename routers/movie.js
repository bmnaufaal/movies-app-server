const MovieController = require("../controllers/movieController");
const authentication = require("../middlewares/authentication");
const authorization = require("../middlewares/authorization");

const router = require("express").Router();

router.get("/movies", authentication, MovieController.findAll);
router.get("/moviesDetail", authentication, MovieController.findAllDetail);
router.post("/movies/add", authentication, MovieController.create);
router.get("/movies/:id", authentication, MovieController.findOne);
router.delete("/movies/:id", authentication, authorization, MovieController.delete);

module.exports = router;
