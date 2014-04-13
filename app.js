(function(){
  "use strict";

  /**
   * Module dependencies.
   */

  var express       = require('express'),
      routes        = require('./routes'),
      http          = require('http'),
      _             = require("underscore"),
      mongoose      = require("mongoose"),
      conf          = require('nconf').argv().env().file({file: __dirname + '/config.json'}),
      schemas       = require("./app/schemas.js"),
      auth          = require("./app/auth.js"),
      errorHandler  = require("./app/errorHandler.js"),
      path          = require('path');

  var app = express(), sessionStore;

  mongoose.connect(conf.get("mongo"));

  // all environments
  app.set('port', conf.get("PORT") || 3000);
  app.set('views', __dirname + '/templates');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.set('view engine', 'jade');
  app.use(express["static"](path.join(__dirname, 'public')));
  app.use(errorHandler);

  // development only
  if ('development' === app.get('env')) {
    //app.use(express.errorHandler());
  }
  _.each(routes, function(route){
    var methods = route[5] || ["get"];

    methods.forEach(function(method){
      var params = [];

      if (route[2]){
        params.push(function(req, res, next){
          req._schemas = schemas;
          next();
        });
      }
      if (route[3]){
        params.push(function(req, res, next){
          req._conf = conf;
          next();
        });
      }

      params.push(auth(conf, schemas, route[4]));

      app[method](route[0], params, route[1]);
    });
  });
  http.createServer(app).listen(app.get('port'), function(){
    console.log('Express server listening on port ' + app.get('port'));
  });
}());
