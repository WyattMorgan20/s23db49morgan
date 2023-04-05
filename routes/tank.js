var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('tank', { title: 'Search Results Tank' });
});

module.exports = router;
