(function(){
  "use strict";

  var base = require("./base.js"),
      async     = require("async"),
      _         = require("underscore"),
      request   = require("../app/request.js"),

      FolderCtrl, _ptype,
      getFilesInFolder;

  FolderCtrl = function(schemas, conf, user, id, account){
    this.schemas = schemas;
    this.conf    = conf;
    this.user    = user;
    this.id      = id;
    this.account = account;

    this.payload = {};
  };

  _ptype = FolderCtrl.prototype = base.getProto("api");
  _ptype._name = "Folder";

  _ptype.prePrep = function(data, cb){
    if (this.id === "base"){
      return this.getBase(data, cb);
    } else {
      var headers = {
        "Authorization": "ApiKey " + this.conf.get("kloudless:api_key")
      };
      var options = {
        host: "api.kloudless.com",
        path: "/v0/accounts/" + this.account + "/folders/" + this.id + "/contents",
        scheme: "https",
        method: "GET",
        headers: headers
      };
      request.request(options, null, "json", function(err, res){
        if (err){
          console.log("err", err, res);
          return cb(err);
        }
        data.contents = res.objects;
        data._err     = 0;
        cb();
      });
    }
  };

  _ptype.getBase = function(data, cb){
    var dir = [];
    for (var i = 0; i < this.user.kloudless_accounts.length; i++){
      var account = this.user.kloudless_accounts[i];
      dir.push({name: account.service, account: account.id, type: "folder", id: "root"});
    }
    data.contents = dir;
    data._err     = 0;
    cb();
  };

  getFilesInFolder = function(account, folderId){
  };

  module.exports = FolderCtrl;
}());
