const router = require('express').Router();

router.get('/genres', (req, res) => {
    res.send('Hello Genres!');
});

module.exports = router;