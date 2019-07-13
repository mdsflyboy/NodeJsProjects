const express = require('express');
const router = express.Router();

router.get('/bootstrap', (req, res) => {
    res.render('bootstrap');
});

router.get('/bootstrap2', (req, res) => {
    res.render('bootstrap2');
});

module.exports = router;