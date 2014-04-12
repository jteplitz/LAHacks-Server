(function(){
  "use strict";

  var Routes = {
    Signup: require("./Signup.js")
  };

  // route, function, schemas, conf, auth, methods
  // auth options: 0: anything, 1: loggedIn
  var routeList = [
    ["/u/signup",          Routes.Signup,       1, 1, 0, ["post"]]
  ];

  module.exports = routeList;
}());
