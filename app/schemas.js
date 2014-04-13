(function(){
  "use strict";
  var mongoose = require("mongoose"),
      _        = require("underscore"),

      Schema   = mongoose.Schema,
      ObjectId = Schema.Types.ObjectId,
      Mixed    = Schema.Types.Mixed,

      validateEmail, validatePhone, updateTime;

  validateEmail = function(value){
    try{
      var emailRegex = new RegExp(/[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/);
      return emailRegex.test(value);
    } catch(e) {
      return false;
    }
  };

  validatePhone = function(val){
    try{
      val = val.replace(/\D/g,'');
      return (val.length === 10);
    } catch (e) {
      return false;
    }
  };

  updateTime = function(next){
    this.updatedAt = new Date().getTime();
    next();
  };

  var User = new Schema({
    name: {type: String, required: true},
    email: {type: String, required: true, validate: validateEmail, index: {unique: true}},
    password: {type: String, required: true},
    updatedAt: Number,
    kloudless_accounts: [{service: String, id: Number}]
  });

  var WebAccount = new Schema({
    loginPage: String,
    loginData: [{cssSelector: String, data: String}],
    loginButton: String
  });


  var Workspace = new Schema({
    tabs: [{url: String, favicon: String, title: String, order: Number}], // TODO: index?
    accounts: [WebAccount],
    updatedAt: Number,
    name: String,
    owner: ObjectId,
    apps: [String],
    rdioSource: String
  });


  User.pre("save", updateTime);
  Workspace.pre("save", updateTime);


  exports.User      = mongoose.model("User", User);
  exports.Workspace = mongoose.model("Workspace", Workspace);
}());
