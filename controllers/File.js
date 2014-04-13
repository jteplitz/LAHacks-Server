(function(){
  "use strict";

  var base = require("./base.js"),
      request   = require("../app/request.js"),

      FileCtrl, _ptype;

  FileCtrl = function(schemas, conf, user, id, account){
    this.schemas = schemas;
    this.conf    = conf;
    this.user    = user;

    this.payload = {};
  };

  _ptype = FileCtrl.prototype = base.getProto("api");
  _ptype._name = "File";

  _ptype.serveFile = function(req, res, id, account){
    var headers = {
      "Authorization": "ApiKey " + this.conf.get("kloudless:api_key")
    };
    var options = {
      host: "api.kloudless.com",
      path: "/v0/accounts/" + account + "/files/" + id + "/contents",
      scheme: "https",
      method: "GET",
      headers: headers
    };
    console.log("options", options);
    request.request(options, null, "binary", function(err, data){
      if (err){
        return res.json(500, {_err: err});
      }
      if (data.type === "response"){
        var serverResponse = data.res;
        serverResponse.pause();
        res.writeHeader(serverResponse.statusCode, serverResponse.headers);
        serverResponse.pipe(res);
        serverResponse.resume();
      } else if (data.type === "request"){
        req.pipe(data.req);
      }
    });
  };


  module.exports = FileCtrl;
}());
