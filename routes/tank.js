var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('tank', { title: 'Search Results Tank' });
});

module.exports = router;

var express = require('express');
const tank_controlers= require('../controllers/tank');
var router = express.Router();
/* GET tanks */
router.get('/', tank_controlers.tank_view_all_Page );
module.exports = router;

/* GET detail Tank page */
router.get('/detail', tank_controlers.tank_view_one_Page);

/* GET create Tank page */
router.get('/create', tank_controlers.tank_create_Page);

/* GET create update page */
router.get('/update', tank_controlers.tank_update_Page);

/* GET delete tank page */
router.get('/delete', tank_controlers.tank_delete_Page);