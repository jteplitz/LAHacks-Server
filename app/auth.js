(function(){
  "use strict";

  var _  = require("underscore"),

      handler;

  handler = function(conf, schemas, level){
    if (level === 0){
      return function(req, res, next){
        next();
      };
    } else if (level === 1){
      return function(req, res, next){
        var auth  = req.header("X-PEEPS-AUTHENTICATION");
        if (!auth){
          // auth header is required
          return next(401);
        }
        var regex = new RegExp('id=\"(.*?)\", type=\"(.*?)\", ' +
                               'device=\"(.*?)\", version=\"(.*?)\"(?:, fb_token=\"(.*?)\")?', 'g');
        auth      = regex.exec(auth);
        if (!auth){
          // auth header was malformed
          return next(401);
        }
        auth.splice(0, 1);
        auth[1] = auth[1].toUpperCase();
      };
    }
  };

  module.exports = handler;
}());
