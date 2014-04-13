(function(){
  "use strict";

  var base = require("./base.js"),

      UpdateRdioCtrl, _ptype;

  UpdateRdioCtrl = function(schemas, user, workspaceId){
    this.schemas = schemas;
    this.user    = user;
    this.workspaceId  = workspaceId;
    this.payload = {};
  };

  _ptype = UpdateRdioCtrl.prototype = base.getProto("api");
  _ptype._name = "UpdateRdio";

  _ptype.savePlaySource = function(source, cb){
    var self = this;
    this.schemas.Workspace.findOne({owner: this.user._id, _id: this.workspaceId}, function(err, workspace){
      if (err){
        return cb(err);
      }
      if (!workspace){
        return cb(true);
      }

      workspace.rdioSource = source;
      workspace.markModified("rdioSource");
      workspace.save(cb);
    });
  };

  module.exports = UpdateRdioCtrl;
}());
