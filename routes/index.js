(function(){
  "use strict";

  var Routes = {
    Signup: require("./Signup.js"),
    Workspaces: require("./Workspaces.js"),
    
    ChromeWorkspace: require("./ChromeWorkspace.js"),
    
    Kloudless: require("./Kloudless.js"),
    Folder: require("./Folder.js"),
    File: require("./File.js")
  };

  // route, function, schemas, conf, auth, methods
  // auth options: 0: anything, 1: loggedIn, 2: loggedIn only for put
  var routeList = [
    ["/u/signup",          Routes.Signup,           1, 0, 0, [      "post"        ]],

    ["/d/workspaces",      Routes.Workspaces,       1, 0, 1, ["get", "post"       ]],
    ["/d/folder/:id?",     Routes.Folder,           1, 1, 1, ["get"               ]],

    ["/c/workspace/:id",   Routes.ChromeWorkspace,  1, 0, 1, ["get", "post"       ]],

    ["/u/kloudless",       Routes.Kloudless,        1, 0, 2, [       "post", "put"]],
    ["/d/file/:id",        Routes.File,             1, 1, 1, ["get", "post"       ]]
  ];

  module.exports = routeList;
}());
