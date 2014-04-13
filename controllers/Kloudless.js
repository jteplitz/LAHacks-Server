(function(){
  "use strict";

  var base = require("./base.js"),
      ViewClass = require("../views/Kloudless.js"),

      KloudlessCtrl, _ptype;

  KloudlessCtrl = function(schemas, user){
    console.log("making controller");
    this.schemas = schemas;
    this.user    = user;

    this.payload = {title: "Connect with Kloudless"};
    this._view   = new ViewClass();
  };

  _ptype = KloudlessCtrl.prototype = base.getProto("std");
  _ptype._name = "Kloudless";

  module.exports = KloudlessCtrl;
}());
