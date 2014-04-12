(function(){
  "use strict";

  var Routes = {
    Signup: require("./Signup.js"),
    Workspaces: require("./Workspaces")
  };

  // route, function, schemas, conf, auth, methods
  // auth options: 0: anything, 1: loggedIn
  var routeList = [
    ["/u/signup",          Routes.Signup,       1, 0, 0, [      "post" ]],

    ["/d/workspaces",      Routes.Workspaces,   1, 0, 1, ["get", "post"]]
  ];

  module.exports = routeList;
}());
