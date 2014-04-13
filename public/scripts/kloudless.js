/*globals Kloudless chrome*/
(function(){
  "use strict";

  var onload;
  

  onload = function(){
    Kloudless.authenticator(document.getElementById("auth"), {
      "app_id": "ugFAYVW2xcY3zcfeO0pvHZBk7YQlcG_LtYTPrIZHjJheSp7q"
    }, function(err, result){
      if (err){
        return console.log("error", err);
      }
      console.log("Authed", result);
    });
  };

  window.onload = onload;
}());
