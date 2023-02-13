const router = require('express').Router();

router.get('/movies', (req, res) => {
    res.send('Hello Movies!');
});

module.exports = router;