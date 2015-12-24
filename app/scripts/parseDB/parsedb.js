
'use strict';

angular.module('Parsedb', [])
.provider('Parsedbmanager', function() {
  this.$get = function($q, $http) {

    // new Parse constructor
    var ParseHighScore = Parse.Object.extend('ParseHighScore');

    // create new obj 
    var parseHighScore = new ParseHighScore();

    this.parseInit = function() {
       // $http.get('keys.php').then(function (response) {
       //    var keys = response.data;
       //    Parse.initialize(keys.appKey, keys.jsKey);
       //  });
        Parse.initialize('pGZExMJgbR0vy3EvyusNzTrybKP8rvRLQ7vQe77Y', 'ZXj4WmTxTHCWD0xD4oURQtnEcGelQCbCOjsYOi05');
    };

    this.setParsedb = function(newScore) {
      // set val
      parseHighScore.set('HighScore', newScore);
      // save score to cloud
      parseHighScore.save(null, {
        success: function (parseHighScore) {
          // protect from change saved obj 
          var acl = new Parse.ACL();
          acl.setPublicReadAccess(true);
          acl.setPublicWriteAccess(false);
          parseHighScore.setACL(acl); 
          console.log('New object created with objectId: ' + parseHighScore.id);
          return parseHighScore.save();
        },
        error: function (parseHighScore, error) {
          console.log('Failed to create new object, with error code: ' + error.message);
        }
      });
    };

    this.getParsedb = function() {
      // need q to get this asynch
      var deferred = $q.defer();
      var query = new Parse.Query(ParseHighScore);
      query.limit(5);
      query.descending("HighScore");
      query.find({
         success: function(results) {
          console.log("Successfully retrieved " + results.length + " scores.");
          // resolve, if you have results
          deferred.resolve(results);
        },
        error: function(error) {
           deferred.reject(error.message);
        }
      });

      return deferred.promise;
    };

    return this;
  };

});
