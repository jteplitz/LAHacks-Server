(function(){
  "use strict";

  var _ = require("underscore"),
      handleGet, handlePost,
      handler, dispatch,

      ControllerClass = require("../controllers/ChromeWorkspace.js");

  handleGet = function(req, res, next){
    var control = new ControllerClass(req._schemas, req.user, req.params.id);

    control.renderData(res, {});
  };

  handlePost = function(req, res, next){
    var control = new ControllerClass(req._schemas, req.user, req.params.id);
    var data = {
      accounts: req.body.accounts
    };
    var tabs = [];
    for (var i = 0; i < req.body.tabs.length; i++){
      var tab = {
        url: req.body.tabs[i].url,
        favicon: req.body.tabs[i].favicon,
        title: req.body.tabs[i].title,
        order: i
      };
      tabs.push(tab);
    }
    data.tabs = tabs;

    control.addChromeData(data, function(err){
      if (err){
        return res.json(500, {_err: err});
      }
      return res.json({_err: 0});
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
