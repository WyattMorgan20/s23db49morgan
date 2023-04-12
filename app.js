var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

require('dotenv').config();
const connectionString =
process.env.MONGO_CON
mongoose = require('mongoose');
mongoose.connect(connectionString,
  {useNewUrlParser: true,
  useUnifiedTopology: true});

//Get the default connection
var db = mongoose.connection;
//Bind connection to error event
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once("open", function(){
  console.log("Connection to DB succeeded")});

var Tank = require("./models/tank");

// We can seed the collection if needed on
// server start
async function recreateDB(){
  // Delete everything
  await Tank.deleteMany();

  /* let instance1 = new Tank({year:'2023', country:'USA', name: 'Abrams'});
  instance1.save()
    .then(function(err, doc){
      if(err) return console.error(err);
      console.log("First object saved")
    });

  let instance2 = new Tank({year:'2023', country:'Germany', name: 'Panther'});
  instance2.save()
    .then(function(err, doc){
      if(err) return console.error(err);
      console.log("Second object saved")
    });

  let instance3 = new Tank({year:'2023', country:'UK', name: 'Challenger'});
  instance3.save()
    .then(function(err, doc){
      if(err) return console.error(err);
      console.log("Third object saved")
    });*/
  //________________________________________________________________________


  /* let instance1 = new Tank({year:'2023', country:'USA', name: 'Abrams'});
  instance1.save()
    .then(function(err, doc){
      console.log(instance1)
    })
    .catch(function (err) {
      console.log(err)
    });

  let instance2 = new Tank({year:'2023', country:'Germany', name: 'Panther'});
  instance2.save()
    .then(function(err, doc){
      console.log(instance2)
    })
    .catch(function (err) {
      console.log(err)
    });

  let instance3 = new Tank({year:'2023', country:'UK', name: 'Challenger'});
  instance3.save()
    .then(function(err, doc){
      console.log(instance3)
    })
    .catch(function (err) {
      console.log(err)
    }); */

  //_______________________________________________________________________
    let instance1 = new Tank({year:2023, country:'USA', name:'Abrams'})
    instance1.save().then(doc=>{
      console.log("First object saved")}
      ).catch(err=>{
      console.error(err)})
    
    let instance2 = new Tank({year:2023, country:'Germany', name:'Panther'})
    instance2.save().then(doc=>{
      console.log("Second object saved")}
      ).catch(err=>{
      console.error(err)})
    
    let instance3 = new Tank({year:2023, country:'UK', name:'Challenger'})
    instance3.save().then(doc=>{
      console.log("Third object saved")}
      ).catch(err=>{
      console.error(err)})
}

let reseed = true;
if (reseed) { recreateDB();}

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var tankRouter = require('./routes/tank');
var boardRouter = require('./routes/board');
var selectorRouter = require('./routes/selector');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/tank', tankRouter);
app.use('/board', boardRouter);
app.use('/selector', selectorRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
