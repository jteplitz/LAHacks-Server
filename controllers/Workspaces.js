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
    this.schemas.Workspace.find({owner: this.user._id}, "_id name updatedAt tabs apps", function(err, workspaces){
      if (err){ console.log("Error", err); return cb(err) }

      data.workspaces = workspaces;
      data._err       = 0;
      cb();
    });
  };

  _ptype.createWorkspace = function(data, cb){
    var workspace = new this.schemas.Workspace({
      name: data.name,
      apps: (data.apps) ? data.apps : [],
      rdioSource: (data.rdioSource) ? data.rdioSource : null,
      owner: this.user._id
    });
    workspace.save(cb);
  };

  module.exports = WorkspacesCtrl;
}());
