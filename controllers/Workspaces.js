(function(){
  "use strict";

  var base = require("./base.js"),

      WorkspacesCtrl, _ptype;

  WorkspacesCtrl = function(){
    this.payload = {};
  };

  _ptype = WorkspacesCtrl.prototype = base.getProto("api");
  _ptype._name = "Workspaces";

  module.exports = WorkspacesCtrl;
}());
