(function(){
  "use strict";

  var _        = require("underscore"),
      validate = require("./validator.js"),
      handlePost,
      handler, dispatch,

      ControllerClass = require("../controllers/Signup.js");

  handlePost = function(req, res, next){
    var data = {};
    var invalid = validate(req.body, [
      {name: "name", type: "presence", msg: "A name is required."},
      {name: "email", type: "email", msg: "A valid email is required."},
      {name: "password", type: "presence", msg: "A password is required."}
    ], data);

    if (invalid){
      console.log("invalid signup", invalid.join(". "));
      return res.json(400, {
        _err: {
          msg: invalid.join(". ")
        }
      });
    }
    var control = new ControllerClass(req._schemas, req._conf);
    control.signupUser(data, function(err){
      if (err){
        return res.json(500, {_err: err, status: 500});
      }

      return res.json({_err: 0});
    });
  };

  
  dispatch = {POST: handlePost};
  handler = function(req, res, next){
    if (_.has(dispatch, req.method)){
      return dispatch[req.method](req, res, next);
    }

    return next(405);
  };
  
  module.exports = handler;
}());
