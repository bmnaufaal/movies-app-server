const Controller = require('../controllers/controller');

const router = require('express').Router();

router.get('/genres', Controller.findAllGenres);

module.exports = router;