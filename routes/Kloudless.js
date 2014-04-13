(function(){
  "use strict";

  var _      = require("underscore"),
      crypto = require("crypto"),
      handlePost, handlePut,
      handler, dispatch,

      ControllerClass = require("../controllers/Kloudless.js"),
      hashPassword;

  handlePost = function(req, res, next){
    var email = req.body.email;
    var pass  = req.body.pass;
    if (!email || !pass){
      return next(401);
    }

    req._schemas.User.findOne({email: email}, function(err, user){
      if (err){ console.log("error", err); return next(500) }

      if (!user){ console.log("no such user"); return next(401) }


      var hash = hashPassword(pass);
      if (hash !== user.password){
        return next(401);
      }
      var control = new ControllerClass(req._schemas, user);

      control.renderView(res, {name: user.name, email: email, pass: pass});
    });
  };

  handlePut = function(req, res, next){
    debugger;
    var accounts = req.body.accounts;
    var control = new ControllerClass(req._schemas, req.user);
    control.addKloudlessAccounts(accounts, function(err){
      debugger;
      if (err){ return res.json(500, {_err: err}) }

      return res.json({_err: 0});
    });
  };
  
  dispatch = {POST: handlePost, PUT: handlePut};
  handler = function(req, res, next){
    debugger;
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
