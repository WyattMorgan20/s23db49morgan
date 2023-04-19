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
        if(req.body.year)
            toUpdate.year = req.body.year;
        if(req.body.country) toUpdate.country = req.body.country;
        if(req.body.name) toUpdate.name = req.body.name;
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

  // Handle building the view for creating a tank.
// No body, no in path parameter, no query.
// Does not need to be async
exports.tank_create_Page = function(req, res) {
    console.log("create view")
    try{
        res.render('tankcreate', { title: 'Tank Create'});
    }
    catch(err){
        res.status(500)
        res.send(`{'error': '${err}'}`);
    }
};

// Handle building the view for updating a Tank.
// query provides the id
exports.tank_update_Page = async function(req, res) {
    console.log("update view for item "+req.query.id)
    try{
        let result = await Tank.findById(req.query.id)
        res.render('tankupdate', { title: 'Tank Update', toShow: result });
    }
    catch(err){
        res.status(500)
        res.send(`{'error': '${err}'}`);
    }
};

// Handle a delete one view with id from query
exports.tank_delete_Page = async function(req, res) {
    console.log("Delete view for id " + req.query.id)
    try{
        result = await Tank.findById(req.query.id)
        res.render('tankdelete', { title: 'Tank Delete', toShow:
        result });
    }
    catch(err){
        res.status(500)
        res.send(`{'error': '${err}'}`);
    }
};