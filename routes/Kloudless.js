(function(){
  "use strict";

  var _      = require("underscore"),
      crypto = require("crypto"),
      handlePost, doInit,
      handler, dispatch,

      ControllerClass = require("../controllers/Kloudless.js"),
      hashPassword;

  handlePost = function(req, res, next){
    var type  = req.body.type;

    if (type === "init"){
      return doInit(req, res, next);
    }
  };

  doInit = function(req, res, next){
    var email = req.body.email;
    var pass  = req.body.pass;
    console.log("got data", email, pass);
    if (!email || !pass){
      return next(401);
    }

    req._schemas.User.findOne({email: email}, function(err, user){
      if (err){ console.log("error", err); return next(500) }

      if (!user){ console.log("no such user"); return next(401) }
      debugger;

      console.log("got user", user);

      var hash = hashPassword(pass);
      if (hash !== user.password){
        return next(401);
      }
      var control = new ControllerClass(req._schemas, user);

      control.renderView(res, {name: user.name, email: email, pass: pass});
    });
  };
  
  dispatch = {POST: handlePost};
  handler = function(req, res, next){
    if (_.has(dispatch, req.method)){
      return dispatch[req.method](req, res, next);
    }

    return next(405);
  };

  hashPassword = function(pass){
    var shasum = crypto.createHash("sha256");

    shasum.update(pass);
    return shasum.digest("hex");
  };
  
  module.exports = handler;
}());
