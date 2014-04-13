(function(){
  "use strict";

  var _ = require("underscore"),
      handleGet,
      handler, dispatch,

      ControllerClass = require("../controllers/Folder.js");

  handleGet = function(req, res, next){
    var id      = req.params.id;
    var account = req.query.account;
    if (!req.params.id){
      id = "base";
    }
    var control = new ControllerClass(req._schemas, req._conf, req.user, id, account);

    control.renderData(res, {});
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
