const router = require('express').Router();

router.get('/routers', (req, res) => {
    res.send('Hello Movies!');
});

module.exports = router;