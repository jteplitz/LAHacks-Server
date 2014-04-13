(function(){
  "use strict";

  var base      = require("./base.js"),
      request   = require("../app/request.js"),
      fs        = require("fs"),

      FileCtrl, _ptype;

  FileCtrl = function(schemas, conf, user, id, account){
    this.schemas = schemas;
    this.conf    = conf;
    this.user    = user;

    this.payload = {};
  };

  _ptype = FileCtrl.prototype = base.getProto("api");
  _ptype._name = "File";

  _ptype.saveFile = function(req, account, parent, name, cb){
    var headers = {
      "Authorization": "ApiKey " + this.conf.get("kloudless:api_key")
    };
    var options = {
      host: "api.kloudless.com",
      path: "/v0/accounts/" + account + "/files/true",
      scheme: "https",
      method: "POST",
      postFormat: "multipart",
      headers: headers
    };
    console.log("files", req.files.file);
    var data = {
      parent_id: parent,
      name: name,
      file: fs.createReadStream(req.files.file)
    };
    console.log("options", options);
    request.request(options, data, "json", function(err){
      if (err){
        return cb(err);
      }
      return cb();
    });
  };


  module.exports = FileCtrl;
}());
