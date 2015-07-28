var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'DopAngular' });
});

/* GET home page. */
router.get('/index-angular', function(req, res, next) {
  res.render('index-angular', { title: 'DopAngular' });
});

module.exports = router;
