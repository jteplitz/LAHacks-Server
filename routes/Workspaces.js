(function(){
  "use strict";

  var _ = require("underscore"),
      handleGet, handlePost,
      handler, dispatch,

      ControllerClass = require("../controllers/Workspaces.js");

  handleGet = function(req, res, next){
    var control = new ControllerClass(req._schemas, req.user);

    control.renderData(res, {});
  };

  handlePost = function(req, res, next){
    var control = new ControllerClass(req._schemas, req.user);

    control.createWorkspace({name: req.body.name}, function(err, workspace){
      if (err){
        return res.json(500, {_err: err});
      }
      return res.json({_err: 0, _id: workspace._id});
    });
  };
  
  dispatch = {GET: handleGet, POST: handlePost};
  handler = function(req, res, next){
    if (_.has(dispatch, req.method)){
      return dispatch[req.method](req, res, next);
    }

    return next(405);
  };
  
  module.exports = handler;
}());
