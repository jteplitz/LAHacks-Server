/*global R, chrome*/
(function(){
  "use strict";

  var extensionId = "dihjneilmgoagbmdbgonjhlkaiagoand",
      sendAccessToken;

  R.ready(function(ready){
    if (!R.authenticated){
      R.authenticate(function(){
        if (!ready){
          return;
        }
        sendAccessToken();
      });
    } else {
      sendAccessToken();
    }
  });

  sendAccessToken = function(){
    chrome.runtime.sendMessage(extensionId,
                               {type: "rdio", accessToken: R.accessToken()});
  };
}());
