const MovieController = require("../controllers/movieController");

const router = require("express").Router();

router.get("/movies", MovieController.findAll);
router.get("/moviesDetail", MovieController.findAllDetail);
router.post("/movies/add", MovieController.create);
router.get("/movies/:id", MovieController.findOne);
router.delete("/movies/:id", MovieController.delete);

module.exports = router;
