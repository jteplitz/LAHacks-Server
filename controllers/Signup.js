(function(){
  "use strict";

  var base   = require("./base.js"),
      crypto = require("crypto"),

      SignupCtrl, _ptype,
      hashPassword;

  SignupCtrl = function(schemas, conf){
    this.schemas = schemas;
    this.conf    = conf;
  };

  _ptype = SignupCtrl.prototype = base.getProto("api");
  _ptype._name = "Signup";

  _ptype.signupUser = function(userData, cb){
    var self = this;
    var hash = hashPassword(userData.password);
    console.log("got hash", hash);
    var user = new self.schemas.User({
      name: userData.name,
      email: userData.email,
      password: hash
    });
    user.save(cb);
  };

  hashPassword = function(pass){
    var shasum = crypto.createHash("sha256");

    shasum.update(pass);
    return shasum.digest("hex");
  };

  module.exports = SignupCtrl;
}());
