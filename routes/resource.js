var express = require('express');
var router = express.Router();
// Require controller modules.
var api_controller = require('../controllers/api');
var tank_controller = require('../controllers/tank');
/// API ROUTE ///
// GET resources base.
router.get('/', api_controller.api);
/// TANK ROUTES ///
// POST request for creating a Tank.
router.post('/tank', tank_controller.tank_create_post);
// DELETE request to delete Tank.
router.delete('/tank/:id', tank_controller.tank_delete);
// PUT request to update Tank.
router.put('/tank/:id', tank_controller.tank_update_put);
// GET request for one Tank.
router.get('/tank/:id', tank_controller.tank_detail);
// GET request for list of all Tank items.
router.get('/tank', tank_controller.tank_list);
module.exports = router;