const Controller = require('../controllers/movie-controller');

const router = require('express').Router();

router.get('/movies', Controller.findAll);
router.get('/moviesDetail', Controller.findAllDetail);
router.post('/movies/add', Controller.create);
router.get('/movies/:id', Controller.findOne);
router.delete('/movies/:id', Controller.delete);

module.exports = router;