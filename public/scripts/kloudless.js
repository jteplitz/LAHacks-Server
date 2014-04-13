/*globals Kloudless chrome user*/
(function(){
  "use strict";

  var saveAuth, authHandler,
      
      extensionId = "dihjneilmgoagbmdbgonjhlkaiagoand",
      appId       = "ugFAYVW2xcY3zcfeO0pvHZBk7YQlcG_LtYTPrIZHjJheSp7q",
      auths       = [];

  $(document).ready(function(){
    Kloudless.authenticator($("#box"), {
      "app_id": appId,
      "services": ["box"]
    }, authHandler);
    Kloudless.authenticator($("#dropbox"), {
      "app_id": appId,
      "services": ["dropbox"]
    }, authHandler);
    Kloudless.authenticator($("#gdrive"), {
      "app_id": appId,
      "services": ["gdrive"]
    }, authHandler);
    Kloudless.authenticator($("#skydrive"), {
      "app_id": appId,
      "services": ["skydrive"]
    }, authHandler);
    $("#save").click(saveAuth);
  });

  authHandler = function(err, result){
    $(".done").show();
    if (err){
      return console.log("error", err);
    }

    var elem = $("#" + result.service);
    elem.removeClass("connect");
    elem.addClass("connected");
    elem.text("✔  Connected");
    Kloudless.stop(elem);
    
    for (var i = 0; i < auths.length; i++){
      if (auths[i].id === result.id){
        return;
      }
    }
    auths.push(result);
  };

  saveAuth = function(result){
    var authHeader = {"X-RUFFLES-AUTHENTICATION": "email=\"" + user.email + "\", pass=\"" + user.pass + "\", version=\"1\""};
    $.ajax({
      contentType: "application/json",
      data: JSON.stringify({accounts: auths}),
      headers: authHeader,
      type: "PUT",
      success: function(data){
        if (data._err !== 0){
          console.log(data);
          return alert("error");
        }
        chrome.runtime.sendMessage(extensionId,
                               {type: "close"});
      }
    });
  };
}());
