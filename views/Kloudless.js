(function(){
  "use strict";
  
  var base = require("./base.js");


  var KloudlessView, _ptype;

  KloudlessView = function(){};

  _ptype = KloudlessView.prototype = base.getProto("std");
  _ptype._view_name = "KloudlessView";
  _ptype._template  = "kloudless.jade";

  module.exports = KloudlessView;
}());
