require('string.prototype.endswith');
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./lib/routes/index');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'lib/views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public'), {setHeaders : setStaticGZipHeaders}));
app.use('/bower_components',  express.static(__dirname + '/bower_components'));
app.use('/jspm_packages',  express.static(__dirname + '/jspm_packages'));

app.use('/', routes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    console.log(err)
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  console.log("PRO")
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

function setStaticGZipHeaders(res, path){  
  if(path.endsWith(".js")){
    if(path.indexOf("\\angular\\")==-1){
      res.set({'Content-Encoding': 'gzip' , 'Content-type' : 'text/javascript'});
    }
  }else if(path.endsWith(".css")){
    res.set({'Content-Encoding': 'gzip' , 'Content-type' : 'text/css'});
  }else if(path.endsWith(".js.map") || path.endsWith(".css.map")){
    res.set({'Content-Encoding': 'gzip' , 'Content-type' : 'application/octet-stream'});
  }
}

module.exports = app;
