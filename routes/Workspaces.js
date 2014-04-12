(function(){
  "use strict";

  var _ = require("underscore"),
      handleGet,
      handler, dispatch,

      ControllerClass = require("../controllers/Workspaces.js");

  handleGet = function(req, res, next){
    var control = new ControllerClass();

    var params = {valid: true, _err: 0};

    control.renderData(res, params);
  };
  
  dispatch = {GET: handleGet};
  handler = function(req, res, next){
    if (_.has(dispatch, req.method)){
      return dispatch[req.method](req, res, next);
    }

    return next(405);
  };
  
  module.exports = handler;
}());
