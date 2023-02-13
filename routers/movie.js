const Controller = require('../controllers/controller');

const router = require('express').Router();

router.get('/movies', Controller.findAllMovies);

module.exports = router;