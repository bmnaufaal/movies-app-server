const Controller = require('../controllers/movie-controller');

const router = require('express').Router();

router.get('/movies', Controller.findAll);
router.post('/movies/add', Controller.create);
router.get('/movies/:id', Controller.findOne);
router.delete('/movies/:id/delete', Controller.delete);
router.get('/movies/:id/detail', Controller.findFullData);

module.exports = router;