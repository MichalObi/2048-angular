
'use strict';

angular.module('Parsedb', [])
.provider('Parsedbmanager', function() {
  this.$get = function() {
    this.parseInit = function() {
      // App and JS Parse Key
      Parse.initialize("TjK6l07kUEYeQ0f3dAqAz6hkbhxLU0VO4XjTm7u5", "3r7Y6UyAOrNcMVHIqORi0EoaaRw9bNSHz76mPW4f");
    };
    this.updateParsedb = function(newScore) {
      // new Parse class
      var ParseHighScore = Parse.Object.extend("ParseHighScore");
      // create new obj 
      var parseHighScore = new ParseHighScore();
      // set val
      parseHighScore.set("HighScore", newScore);
      // save score to cloud
      parseHighScore.save(null, {
        success: function (parseHighScore) {
          console.log('New object created with objectId: ' + parseHighScore.id);
        },
        error: function (parseHighScore) {
          console.log('Failed to create new object, with error code: ' + error.message);
        }
      });

    }
    return this;
  };
});
