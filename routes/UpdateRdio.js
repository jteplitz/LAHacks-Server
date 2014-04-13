(function(){
  "use strict";

  var _ = require("underscore"),
      handlePost,
      handler, dispatch,

    ControllerClass = require("../controllers/UpdateRdio.js");

  handlePost = function(req, res, next){
    var control = new ControllerClass(req._schemas, req.user, req.params.workspace_id);
    control.savePlaySource(req.body.playSource, function(err){
      if (err){
        return res.json(500, {_err: err});
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
