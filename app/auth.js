(function(){
  "use strict";

  var _      = require("underscore"),
      crypto = require("crypto"),

      handler,
      hashPassword;

  handler = function(conf, schemas, level){
    if (level === 0){
      return function(req, res, next){
        next();
      };
    } else if (level === 1){
      return function(req, res, next){
        var auth  = req.header("X-RUFFLES-AUTHENTICATION");
        if (!auth){
          // auth header is required
          return next(401);
        }
        var regex = new RegExp('email=\"(.*?)\", pass=\"(.*?)\", version=\"(.*?)\"', 'g');
        auth      = regex.exec(auth);
        if (!auth){
          // auth header was malformed
          return next(401);
        }
        auth.splice(0, 1);
        if (auth[2] !== "1"){
          console.log("Unsupported auth version");
          return next(401);
        }
        schemas.User.findOne({email: auth[0]}, function(err, user){
          if (err){ console.log("error", err); return next(500) }

          if (!user){ return next(401) }

          var hash = hashPassword(auth[1]);
          if (hash !== user.password){
            return next(401);
          }

          req.user = user;
          return next();
        });
      };
    }
  };

  hashPassword = function(pass){
    var shasum = crypto.createHash("sha256");

    shasum.update(pass);
    return shasum.digest("hex");
  };

  module.exports = handler;
}());
