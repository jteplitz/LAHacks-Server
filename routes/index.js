(function(){
  "use strict";

  var Routes = {
    Signup: require("./Signup.js"),
    Workspaces: require("./Workspaces"),
    
    ChromeWorkspace: require("./ChromeWorkspace"),
    
    Kloudless: require("./Kloudless")
  };

  // route, function, schemas, conf, auth, methods
  // auth options: 0: anything, 1: loggedIn, 2: loggedIn only for put
  var routeList = [
    ["/u/signup",          Routes.Signup,           1, 0, 0, [      "post"        ]],

    ["/d/workspaces",      Routes.Workspaces,       1, 0, 1, ["get", "post"       ]],

    ["/c/workspace/:id",   Routes.ChromeWorkspace,  1, 0, 1, ["get", "post"       ]],

    ["/u/kloudless",       Routes.Kloudless,        1, 0, 2, [       "post", "put"]]
  ];

  module.exports = routeList;
}());
