const router = require("express").Router();

router.get("/", (req, res) => {
  res.send("Movies App");
});
router.use(require("./movie"));
router.use(require("./genre"));

module.exports = router;
