var express = require('express');
var debug = require('debug')('rokutools:modules');
var router = express.Router();

router.get('/dashboard', function(req, res, next) {
    debug(req);
    res.render('dashboard.html', { title: 'RokuTools' });
});

router.get('/memory-analyser', function(req, res, next) {
    res.render('memory-analyser.html', { title: 'RokuTools' });
});

router.get('/remote', function(req, res, next) {
    res.render('remote.html', { title: 'RokuTools' });
});

router.get('/scret-screens', function(req, res, next) {
    res.render('secret-screens.html', { title: 'RokuTools' });
});

module.exports = router;
