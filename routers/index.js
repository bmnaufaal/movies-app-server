const router = require("express").Router();
const userRouter = require("./user");
const movieRouter = require("./movie");
const genreRouter = require("./genre");

router.get("/", (req, res) => {
  res.send("Movies App");
});

router.use('/', userRouter);
router.use('/movies', movieRouter);
router.use('/genres', genreRouter);

module.exports = router;
