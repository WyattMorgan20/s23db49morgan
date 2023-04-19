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

// Handle Tank create on POST.
exports.tank_create_post = async function(req, res) {
    console.log(req.body)
    let document = new Tank();
    // We are looking for a body, since POST does not have query parameters.
    // Even though bodies can be in many different formats, we will be picky
    // and require that it be a json object
    // {"tank_type":"goat", "cost":12, "size":"large"}
    document.year = req.body.year;
    document.country = req.body.country;
    document.name = req.body.name;
    try{
        let result = await document.save();
        res.send(result);
    }
    catch(err){
        res.status(500);
        res.send(`{"error": ${err}}`);
    }
};

// for a specific Tank.
exports.tank_detail = async function(req, res) {
    console.log("detail" + req.params.id)
    try {
    result = await Tank.findById( req.params.id)
    res.send(result)
    } catch (error) {
    res.status(500)
    res.send(`{"error": document for id ${req.params.id} not found`);
    }
};

//Handle Tank update form on PUT.
exports.tank_update_put = async function(req, res) {
    console.log(`update on id ${req.params.id} with body
${JSON.stringify(req.body)}`)
    try {
        let toUpdate = await Tank.findById( req.params.id)
        // Do updates of properties
        if(req.body.tank_type)
            toUpdate.tank_type = req.body.tank_type;
        if(req.body.cost) toUpdate.cost = req.body.cost;
        if(req.body.size) toUpdate.size = req.body.size;
        let result = await toUpdate.save();
        console.log("Sucess " + result)
        res.send(result)
    } catch (err) {
        res.status(500)
        res.send(`{"error": ${err}: Update for id ${req.params.id} failed`);
    }
};

// Handle Tank delete on DELETE.
exports.tank_delete = async function(req, res) {
    console.log("delete " + req.params.id)
    try {
        result = await Tank.findByIdAndDelete( req.params.id)
        console.log("Removed " + result)
        res.send(result)
    } catch (err) {
        res.status(500)
        res.send(`{"error": Error deleting ${err}}`);
    }
};

// Handle a show one view with id specified by query
exports.tank_view_one_Page = async function(req, res) {
    console.log("single view for id " + req.query.id)
    try{
      result = await Tank.findById( req.query.id)
      res.render('tankdetail',
        { title: 'Tank Detail', toShow: result });
    }
    catch(err){
      res.status(500)
      res.send(`{'error': '${err}'}`);
    }
  };