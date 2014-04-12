/*global R, chrome*/
(function(){
  "use strict";

  R.ready(function(ready){
    R.authenticate(function(){
      if (!ready){
        return;
      }
      chrome.runtime.sendMessage("bpacmphlogdcmmioefbknbdpbjenglhg",
                                 {type: "rdio", accessToken: R.accessToken()});
    });
  });
}());
