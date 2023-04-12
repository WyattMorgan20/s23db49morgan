var Tank = require('../models/tank');
// List of all Tanks
exports.tank_list = function(req, res) {
res.send('NOT IMPLEMENTED: Tank list');
};
// for a specific Tank.
exports.tank_detail = function(req, res) {
res.send('NOT IMPLEMENTED: Tank detail: ' + req.params.id);
};
// Handle Tank create on POST.
exports.tank_create_post = function(req, res) {
res.send('NOT IMPLEMENTED: Tank create POST');
};
// Handle Tank delete form on DELETE.
exports.tank_delete = function(req, res) {
res.send('NOT IMPLEMENTED: Tank delete DELETE ' + req.params.id);
};
// Handle Tank update form on PUT.
exports.tank_update_put = function(req, res) {
res.send('NOT IMPLEMENTED: Tank update PUT' + req.params.id);
};

// List of all Tanks
exports.tank_list = async function(req, res) {
    try{
    theTanks = await Tank.find();
    res.send(theTanks);
    }
    catch(err){
    res.status(500);
    res.send(`{"error": ${err}}`);
    }
    };

// VIEWS
// Handle a show all view
exports.tank_view_all_Page = async function(req, res) {
    try{
    theTanks = await Tank.find();
    res.render('tank', { title: 'Tank Search Results', results: theTanks });
    }
    catch(err){
    res.status(500);
    res.send(`{"error": ${err}}`);
    }
    };