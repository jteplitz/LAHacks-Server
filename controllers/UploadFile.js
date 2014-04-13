(function(){
  "use strict";

  var base      = require("./base.js"),
      request   = require("../app/request.js"),
      fs        = require("fs"),
      FormData  = require('form-data'),
      https     = require("https"),

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
    console.log("Posting to account " + account + " with parent " + parent + " and name " + name);

    var form = new FormData();
    var metadata = {
      parent_id: parent,
      name: name
    };
    form.append("metadata", JSON.stringify(metadata));
    form.append("file", fs.createReadStream(req.files.file.path));

    var headers = form.getHeaders();
    headers.Authorization = "ApiKey " + this.conf.get("kloudless:api_key");

    var options = {
      host: "api.kloudless.com",
      path: "/v0/accounts/" + account + "/files?overwrite=true",
      headers: headers,
      method: "POST"
    };
    console.log("options", options);

    var request = https.request(options);
    request.on("response", function(res){
      if (res.statusCode >= 300){
        console.log("error", res.body);
        return cb({_err: res.statusCode});
      }
      return cb(null);
    });
    request.on("error", cb);
    form.pipe(request);
  };


  module.exports = FileCtrl;
}());
