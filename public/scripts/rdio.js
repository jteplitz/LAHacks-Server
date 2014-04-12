/*global R, chrome*/
(function(){
  "use strict";

  R.ready(function(ready){
    R.authenticate(function(){
      if (!ready){
        return;
      }
      console.log("data", R.accessToken());
    });
  });
}());
