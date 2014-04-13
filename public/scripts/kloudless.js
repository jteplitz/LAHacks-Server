/*globals Kloudless chrome user*/
(function(){
  "use strict";

  var saveAuth;

  $(document).ready(function(){
    Kloudless.authenticator($("#auth"), {
      "app_id": "ugFAYVW2xcY3zcfeO0pvHZBk7YQlcG_LtYTPrIZHjJheSp7q"
    }, function(err, result){
      if (err){
        return console.log("error", err);
      }

      $("#auth").hide();

      saveAuth(result);
    });
  });

  saveAuth = function(result){
    var authHeader = {"X-RUFFLES-AUTHENTICATION": "email=\"" + user.email + "\", pass=\"" + user.pass + "\", version=\"1\""};
    $.ajax({
      contentType: "application/json",
      data: result,
      headers: [authHeader],
      type: "PUT",
      success: function(data){
        if (data._err !== 0){
          console.log(data);
          return alert("error");
        }
        chrome.tabs.getCurrent(function(tabInfo){
          chrome.tabs.remove(tabInfo.id);
        });
      }
    });
  };
}());
