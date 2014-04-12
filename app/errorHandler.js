(function(){
  "use strict";
  var _ = require("underscore");

  // simple error handler
  module.exports = function(err, req, res, next){
    var msg = "";
    if (_.isObject(err)){
      return res.json(err.statusCode || 500, {
        _err: err.statusCode,
        msg: err.msg
      });
    }
    return res.json(err, {_err: err});
  };
}());
