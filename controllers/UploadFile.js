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
    console.log("files", req.files.file);
    var options = {
      host: "api.kloudless.com",
      path: "/v0/accounts/" + account + "/files/true",
      scheme: "https",
      method: "POST",
      postFormat: "multipart",
      headers: headers
    };
    console.log("requesting", req.files.file);
    var stream = fs.createReadStream(req.files.file.path);
    var data = {
      parent_id: parent,
      name: name
    };
    console.log("options", options);
    console.log("data", data);
    request.request(options, data, "json", function(err, response){
      if (err){
        return cb(err);
      }
      if (response.hasOwnProperty("type") && response.type === "request"){
        console.log("piping");
        stream.pipe(data.req);
      }
      console.log("response", response);
      return cb();
    });
  };


  module.exports = FileCtrl;
}());
