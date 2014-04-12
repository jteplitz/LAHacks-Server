(function(){
  "use strict";

  var base = require("./base.js"),

      WorkspacesCtrl, _ptype;

  WorkspacesCtrl = function(schemas, user){
    this.schemas = schemas;
    this.user    = user;

    this.payload = {};
  };

  _ptype = WorkspacesCtrl.prototype = base.getProto("api");
  _ptype._name = "Workspaces";

  _ptype.prePrep = function(data, cb){
    this.schemas.Workspace.find({owner: this.user._id}, "_id name", function(err, workspaces){
      if (err){ console.log("Error", err); return cb(err) }

      data.workspaces = workspaces;
      data._err       = 0;
      cb();
    });
  };

  module.exports = WorkspacesCtrl;
}());
