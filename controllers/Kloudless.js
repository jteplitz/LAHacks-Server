(function(){
  "use strict";

  var base = require("./base.js"),
      ViewClass = require("../views/Kloudless.js"),

      KloudlessCtrl, _ptype;

  KloudlessCtrl = function(schemas, user){
    this.schemas = schemas;
    this.user    = user;

    this.payload = {title: "Connect with Kloudless"};
    this._view   = new ViewClass();
  };

  _ptype = KloudlessCtrl.prototype = base.getProto("std");
  _ptype._name = "Kloudless";

  _ptype.addKloudlessAccounts = function(accounts, cb){
    this.user.accounts = accounts;
    this.user.markModified("accounts");
    
    this.user.save(cb);
  };

  module.exports = KloudlessCtrl;
}());
