var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.redirect('/dashboard');
  //res.render('index.html', { title: 'RokuTools' });
});

module.exports = router;
