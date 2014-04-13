(function(){
  "use strict";

  var _ = require("underscore"),
      handlePost,
      handler, dispatch,

      ControllerClass = require("../controllers/UploadFile.js");

  handlePost = function(req, res, next){
    console.log("got upload request", req.params.account, req.params.parent, req.params.id);
    var control = new ControllerClass(req._schemas, req._conf, req.user);
    
    control.saveFile(req, req.params.account, req.params.parent, req.params.id, function(err){
      console.log("file save returned", err);
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
