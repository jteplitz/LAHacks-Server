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
    form.append("parent_id", parent);
    form.append("name", name);
    //form.append("file", fs.createReadStream(req.files.file.path), {knownLength: 11885});
    form.append("file", fs.createReadStream(req.files.file.path));

    console.log("Form", form);

    var headers = form.getHeaders();
    headers.Authorization     = "ApiKey " + this.conf.get("kloudless:api_key");
    //headers["Content-Length"] = form.getLengthSync();
    headers["Content-Type"]   = "multipart/form-data";

    var options = {
      host: "api.kloudless.com",
      path: "/v0/accounts/" + account + "/files/True",
      method: "post",
      headers: headers
    };
    console.log("options", options);

    var request = https.request(options);
    form.pipe(request);

    request.on('response', function(res) {
      console.log("got response", res.statusCode, res);
      if (res.statusCode !== 200){
        return cb({_err: res});
      }
      return cb();
    });

    /*request.request(options, data, "json", function(err, response){
      if (err){
        return cb(err);
      }
      if (response.hasOwnProperty("type") && response.type === "request"){
        console.log("piping", data.req, stream);
        stream.pipe(data.req);
      }
      console.log("response", response);
      return cb();
    });*/
  };


  module.exports = FileCtrl;
}());
